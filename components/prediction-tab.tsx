"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { User, Heart, Thermometer, Activity, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { datasetManager } from "@/lib/dataset-manager"

interface PredictionTabProps {
  systemStatus: {
    datasetLoaded: boolean
    modelsTrained: boolean
    lastTraining: string | null
    totalPredictions: number
    accuracyRate: number
    newDiagnoses: number
    learningEvents: number
    datasetSize?: number
  }
  onStatusChange: (status: any) => void
}

export default function PredictionTab({ systemStatus, onStatusChange }: PredictionTabProps) {
  const [patientData, setPatientData] = useState({
    patientId: "P001",
    age: 35,
    sex: "M",
    weight: 70,
    height: 170,
    systolicBP: 120,
    diastolicBP: 80,
    glucose: 90,
    cholesterol: 180,
    temperature: 36.5,
    heartRate: 75,
    oxygenSaturation: 98,
  })

  const [symptoms, setSymptoms] = useState({
    fever: false,
    cough: false,
    headache: false,
    fatigue: false,
    chestPain: false,
    breathingDifficulty: false,
    abdominalPain: false,
    vomiting: false,
    diarrhea: false,
    dizziness: false,
    blurredVision: false,
    musclePain: false,
    rash: false,
    swelling: false,
  })

  const [medicalHistory, setMedicalHistory] = useState({
    diabetes: false,
    hypertension: false,
    asthma: false,
    copd: false,
    kidneyDisease: false,
    drugAllergy: false,
    penicillinAllergy: false,
    nsaidAllergy: false,
  })

  const [diagnosis, setDiagnosis] = useState("")
  const [selectedModel, setSelectedModel] = useState("random_forest")
  const [prediction, setPrediction] = useState<{
    medication: string
    confidence: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [customDiagnosis, setCustomDiagnosis] = useState("")
  const [isLearning, setIsLearning] = useState(false)
  const [learningProgress, setLearningProgress] = useState(0)
  const [availableDiagnoses, setAvailableDiagnoses] = useState([
    "Hipertensión",
    "Diabetes",
    "Infección respiratoria",
    "Gastritis",
    "Asma",
    "Dolor muscular",
    "Fiebre",
    "Alergia",
    "EPOC",
    "Insuficiencia renal",
  ])
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  const symptomsList = [
    { key: "fever", label: "Fiebre", icon: Thermometer },
    { key: "cough", label: "Tos", icon: Activity },
    { key: "headache", label: "Dolor de cabeza", icon: AlertTriangle },
    { key: "fatigue", label: "Fatiga", icon: Activity },
    { key: "chestPain", label: "Dolor de pecho", icon: Heart },
    { key: "breathingDifficulty", label: "Dificultad respirar", icon: Activity },
    { key: "abdominalPain", label: "Dolor abdominal", icon: AlertTriangle },
    { key: "vomiting", label: "Vómitos", icon: AlertTriangle },
    { key: "diarrhea", label: "Diarrea", icon: AlertTriangle },
    { key: "dizziness", label: "Mareos", icon: AlertTriangle },
    { key: "blurredVision", label: "Visión borrosa", icon: AlertTriangle },
    { key: "musclePain", label: "Dolor muscular", icon: Activity },
    { key: "rash", label: "Erupción", icon: AlertTriangle },
    { key: "swelling", label: "Hinchazón", icon: AlertTriangle },
  ]

  const medicalHistoryList = [
    { key: "diabetes", label: "Diabetes" },
    { key: "hypertension", label: "Hipertensión" },
    { key: "asthma", label: "Asma" },
    { key: "copd", label: "EPOC" },
    { key: "kidneyDisease", label: "Insuf. Renal" },
    { key: "drugAllergy", label: "Alergia Medicamentos" },
    { key: "penicillinAllergy", label: "Alergia Penicilina" },
    { key: "nsaidAllergy", label: "Alergia AINEs" },
  ]

  const handlePredict = async () => {
    if (!systemStatus.modelsTrained) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const medications = ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Omeprazol", "Metformina"]
      const randomMedication = medications[Math.floor(Math.random() * medications.length)]
      const confidence = Math.random() * 0.4 + 0.6 // 60-100%

      setPrediction({
        medication: randomMedication,
        confidence: confidence,
      })

      // Actualizar contador de predicciones
      onStatusChange({
        ...systemStatus,
        totalPredictions: systemStatus.totalPredictions + 1,
      })

      setIsLoading(false)
    }, 2000)
  }

  const handlePositiveFeedback = async () => {
    if (!prediction) return

    setIsLearning(true)
    setLearningProgress(0)
    setFeedbackGiven(true)

    // Simular proceso de aprendizaje continuo más detallado
    const learningSteps = [
      { step: "Validando datos del paciente...", progress: 15 },
      { step: "Preparando nueva muestra...", progress: 30 },
      { step: "Agregando al dataset de entrenamiento...", progress: 50 },
      { step: "Recalculando características...", progress: 65 },
      { step: "Actualizando modelo Random Forest...", progress: 80 },
      { step: "Optimizando parámetros...", progress: 95 },
      { step: "Dataset actualizado exitosamente", progress: 100 },
    ]

    for (const { step, progress } of learningSteps) {
      setLearningProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Crear nueva muestra para el dataset usando el DatasetManager
    const newSample = {
      patient_id: patientData.patientId,
      age: patientData.age,
      sex: patientData.sex,
      weight: patientData.weight,
      height: patientData.height,
      systolic_bp: patientData.systolicBP,
      diastolic_bp: patientData.diastolicBP,
      glucose: patientData.glucose,
      temperature: patientData.temperature,
      heart_rate: patientData.heartRate,
      oxygen_saturation: patientData.oxygenSaturation,
      fever: symptoms.fever,
      cough: symptoms.cough,
      headache: symptoms.headache,
      fatigue: symptoms.fatigue,
      chest_pain: symptoms.chestPain,
      breathing_difficulty: symptoms.breathingDifficulty,
      abdominal_pain: symptoms.abdominalPain,
      vomiting: symptoms.vomiting,
      diarrhea: symptoms.diarrhea,
      dizziness: symptoms.dizziness,
      blurred_vision: symptoms.blurredVision,
      muscle_pain: symptoms.musclePain,
      rash: symptoms.rash,
      swelling: symptoms.swelling,
      diabetes: medicalHistory.diabetes,
      hypertension: medicalHistory.hypertension,
      asthma: medicalHistory.asthma,
      copd: medicalHistory.copd,
      kidney_disease: medicalHistory.kidneyDisease,
      drug_allergy: medicalHistory.drugAllergy,
      penicillin_allergy: medicalHistory.penicillinAllergy,
      nsaid_allergy: medicalHistory.nsaidAllergy,
      diagnosis: diagnosis === "otro" ? customDiagnosis : diagnosis,
      recommended_medication: prediction.medication,
      confidence: prediction.confidence,
      feedback: "positive",
      timestamp: new Date().toISOString(),
    }

    // Agregar la muestra al dataset
    datasetManager.addSample(newSample)
    const stats = datasetManager.getStats()

    // Si es un diagnóstico personalizado, agregarlo a la lista
    const finalDiagnosis = diagnosis === "otro" ? customDiagnosis : diagnosis
    if (diagnosis === "otro" && customDiagnosis && !availableDiagnoses.includes(customDiagnosis)) {
      setAvailableDiagnoses((prev) => [...prev, customDiagnosis].sort())

      // Actualizar contador de nuevos diagnósticos y dataset
      onStatusChange({
        ...systemStatus,
        newDiagnoses: systemStatus.newDiagnoses + 1,
        learningEvents: systemStatus.learningEvents + 1,
        accuracyRate: Math.min(systemStatus.accuracyRate + 0.2, 99.9),
        datasetSize: stats.totalSamples,
        lastDatasetUpdate: new Date().toISOString(),
      })
    } else {
      // Solo actualizar eventos de aprendizaje, precisión y dataset
      onStatusChange({
        ...systemStatus,
        learningEvents: systemStatus.learningEvents + 1,
        accuracyRate: Math.min(systemStatus.accuracyRate + 0.1, 99.9),
        datasetSize: stats.totalSamples,
        lastDatasetUpdate: new Date().toISOString(),
      })
    }

    // Simular mejora en la confianza del modelo
    if (prediction) {
      setPrediction({
        ...prediction,
        confidence: Math.min(prediction.confidence + 0.03, 0.99), // Mejora más notable
      })
    }

    setIsLearning(false)

    // Mostrar notificación de éxito más detallada
    setTimeout(() => {
      setFeedbackGiven(false)
    }, 4000)
  }

  const handleNegativeFeedback = () => {
    setFeedbackGiven(true)
    // Aquí podrías implementar lógica para manejar feedback negativo
    setTimeout(() => {
      setFeedbackGiven(false)
    }, 2000)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600"
    if (confidence >= 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return CheckCircle
    if (confidence >= 0.6) return AlertTriangle
    return XCircle
  }

  if (!systemStatus.modelsTrained) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Los modelos no están entrenados. Ve a la pestaña de Entrenamiento para entrenar los modelos primero.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient Data Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Datos del Paciente</span>
            </CardTitle>
            <CardDescription>Ingresa la información clínica completa del paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId">ID del Paciente</Label>
                  <Input
                    id="patientId"
                    value={patientData.patientId}
                    onChange={(e) => setPatientData({ ...patientData, patientId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="120"
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Sexo</Label>
                  <Select
                    value={patientData.sex}
                    onValueChange={(value) => setPatientData({ ...patientData, sex: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="20"
                    max="200"
                    value={patientData.weight}
                    onChange={(e) => setPatientData({ ...patientData, weight: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="100"
                    max="220"
                    value={patientData.height}
                    onChange={(e) => setPatientData({ ...patientData, height: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>IMC</Label>
                  <div className="p-2 bg-gray-50 rounded-md text-sm">
                    {(patientData.weight / Math.pow(patientData.height / 100, 2)).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Vital Signs */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Signos Vitales</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolicBP">Presión Sistólica</Label>
                  <Input
                    id="systolicBP"
                    type="number"
                    min="80"
                    max="200"
                    value={patientData.systolicBP}
                    onChange={(e) => setPatientData({ ...patientData, systolicBP: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolicBP">Presión Diastólica</Label>
                  <Input
                    id="diastolicBP"
                    type="number"
                    min="50"
                    max="120"
                    value={patientData.diastolicBP}
                    onChange={(e) => setPatientData({ ...patientData, diastolicBP: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Frecuencia Cardíaca</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    min="40"
                    max="200"
                    value={patientData.heartRate}
                    onChange={(e) => setPatientData({ ...patientData, heartRate: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperatura (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="35"
                    max="42"
                    step="0.1"
                    value={patientData.temperature}
                    onChange={(e) => setPatientData({ ...patientData, temperature: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oxygenSaturation">Saturación O2 (%)</Label>
                  <Input
                    id="oxygenSaturation"
                    type="number"
                    min="80"
                    max="100"
                    value={patientData.oxygenSaturation}
                    onChange={(e) =>
                      setPatientData({ ...patientData, oxygenSaturation: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glucose">Glucosa (mg/dL)</Label>
                  <Input
                    id="glucose"
                    type="number"
                    min="50"
                    max="400"
                    value={patientData.glucose}
                    onChange={(e) => setPatientData({ ...patientData, glucose: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Symptoms */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Síntomas Actuales</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {symptomsList.map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={symptoms[key as keyof typeof symptoms]}
                      onCheckedChange={(checked) => setSymptoms({ ...symptoms, [key]: checked })}
                    />
                    <Label htmlFor={key} className="text-sm flex items-center space-x-1">
                      <Icon className="h-3 w-3" />
                      <span>{label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Medical History */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Antecedentes Médicos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {medicalHistoryList.map(({ key, label }) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={medicalHistory[key as keyof typeof medicalHistory]}
                      onCheckedChange={(checked) => setMedicalHistory({ ...medicalHistory, [key]: checked })}
                    />
                    <Label htmlFor={key} className="text-sm">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Diagnosis and Model Selection */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnóstico Principal</Label>
                  <Select value={diagnosis} onValueChange={setDiagnosis}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un diagnóstico" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDiagnoses.map((diag) => (
                        <SelectItem key={diag} value={diag}>
                          {diag}
                        </SelectItem>
                      ))}
                      <SelectItem value="otro">🔍 Otro (especificar)</SelectItem>
                    </SelectContent>
                  </Select>

                  {diagnosis === "otro" && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="customDiagnosis">Especificar Diagnóstico</Label>
                      <Input
                        id="customDiagnosis"
                        placeholder="Ingresa el diagnóstico específico..."
                        value={customDiagnosis}
                        onChange={(e) => setCustomDiagnosis(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo a Usar</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random_forest">Random Forest</SelectItem>
                      <SelectItem value="logistic">Regresión Logística</SelectItem>
                      <SelectItem value="knn">K-Nearest Neighbors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generar Recomendación</CardTitle>
            <CardDescription>Obtén una recomendación de medicamento basada en los datos clínicos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handlePredict}
              disabled={isLoading || !diagnosis || (diagnosis === "otro" && !customDiagnosis)}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Analizando..." : "🔍 Generar Recomendación"}
            </Button>

            {isLoading && (
              <div className="space-y-2">
                <Progress value={66} className="w-full" />
                <p className="text-sm text-gray-600 text-center">Procesando datos clínicos...</p>
              </div>
            )}

            {prediction && !isLoading && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-lg mb-2">Medicamento Recomendado</h3>
                  <div className="text-2xl font-bold text-blue-700 mb-2">💊 {prediction.medication}</div>

                  <div className="flex items-center space-x-2 mb-3">
                    {(() => {
                      const Icon = getConfidenceIcon(prediction.confidence)
                      return <Icon className={`h-4 w-4 ${getConfidenceColor(prediction.confidence)}`} />
                    })()}
                    <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                      Confianza: {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>

                  <Progress value={prediction.confidence * 100} className="mb-3" />

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent hover:bg-green-50 hover:border-green-300"
                      onClick={handlePositiveFeedback}
                      disabled={feedbackGiven || isLearning}
                    >
                      {isLearning ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          Aprendiendo...
                        </>
                      ) : feedbackGiven ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                          ¡Gracias!
                        </>
                      ) : (
                        <>👍 Correcto</>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent hover:bg-red-50 hover:border-red-300"
                      onClick={handleNegativeFeedback}
                      disabled={feedbackGiven || isLearning}
                    >
                      {feedbackGiven ? (
                        <>
                          <XCircle className="h-3 w-3 mr-1 text-red-600" />
                          Registrado
                        </>
                      ) : (
                        <>👎 Incorrecto</>
                      )}
                    </Button>
                  </div>

                  {isLearning && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-600 font-medium">🧠 Actualizando dataset...</span>
                        <span>{learningProgress}%</span>
                      </div>
                      <Progress value={learningProgress} className="h-2" />
                      <p className="text-xs text-gray-600 text-center">
                        Agregando nueva muestra al dataset de entrenamiento
                      </p>
                    </div>
                  )}
                </div>

                {/* Patient Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Resumen del Paciente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>IMC:</span>
                      <span>{(patientData.weight / Math.pow(patientData.height / 100, 2)).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Presión:</span>
                      <span>
                        {patientData.systolicBP}/{patientData.diastolicBP}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Síntomas:</span>
                      <span>{Object.values(symptoms).filter(Boolean).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Antecedentes:</span>
                      <span>{Object.values(medicalHistory).filter(Boolean).length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
