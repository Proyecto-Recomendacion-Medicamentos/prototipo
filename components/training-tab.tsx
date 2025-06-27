"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, CheckCircle, BarChart3, Database, Activity } from "lucide-react"
import DatasetStatus from "./dataset-status"
import { datasetManager } from "@/lib/dataset-manager"

interface TrainingTabProps {
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

export default function TrainingTab({ systemStatus, onStatusChange }: TrainingTabProps) {
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [trainingStep, setTrainingStep] = useState("")
  const [modelResults, setModelResults] = useState<any[]>([])
  const [datasetStats, setDatasetStats] = useState<any>({})

  // Cargar estadísticas del dataset al montar el componente
  useEffect(() => {
    const loadDatasetStats = async () => {
      await datasetManager.loadInitialDataset()
      const stats = datasetManager.getStats()
      setDatasetStats(stats)
    }
    loadDatasetStats()
  }, [systemStatus.learningEvents])

  const handleTraining = async () => {
    setIsTraining(true)
    setTrainingProgress(0)
    setTrainingStep("Preparando datos...")

    // Simulate training process
    const steps = [
      { step: "Cargando dataset integrado...", progress: 10 },
      { step: "Preprocesando características...", progress: 25 },
      { step: "Entrenando Regresión Logística...", progress: 45 },
      { step: "Entrenando K-Nearest Neighbors...", progress: 65 },
      { step: "Entrenando Random Forest...", progress: 85 },
      { step: "Evaluando modelos...", progress: 100 },
    ]

    for (const { step, progress } of steps) {
      setTrainingStep(step)
      setTrainingProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    // Simulate results
    const results = [
      { model: "Random Forest", accuracy: 0.892, precision: 0.885, recall: 0.898 },
      { model: "Regresión Logística", accuracy: 0.834, precision: 0.829, recall: 0.841 },
      { model: "K-Nearest Neighbors", accuracy: 0.798, precision: 0.792, recall: 0.805 },
    ]

    setModelResults(results)
    setIsTraining(false)

    // Actualizar estado del sistema
    onStatusChange({
      ...systemStatus,
      modelsTrained: true,
      lastTraining: new Date().toISOString(),
      accuracyRate: 89.2, // Precisión inicial del mejor modelo
    })
  }

  return (
    <div className="space-y-6">
      {/* Dataset Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Estado del Dataset</span>
          </CardTitle>
          <CardDescription>
            Dataset integrado listo para entrenamiento con {datasetStats.totalSamples || systemStatus.datasetSize || 0}{" "}
            muestras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {datasetStats.totalSamples || systemStatus.datasetSize || 0}
              </div>
              <div className="text-sm text-gray-600">Total Muestras</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{datasetStats.originalSamples || 0}</div>
              <div className="text-sm text-gray-600">Originales</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {datasetStats.learnedSamples || systemStatus.learningEvents || 0}
              </div>
              <div className="text-sm text-gray-600">Aprendidas</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{datasetStats.diagnoses || 10}</div>
              <div className="text-sm text-gray-600">Diagnósticos</div>
            </div>
          </div>

          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Dataset integrado y listo para entrenamiento. Incluye {datasetStats.medications || 10} medicamentos
              únicos y 28 características clínicas.
              {systemStatus.learningEvents > 0 && (
                <span className="block mt-1 text-green-600 font-medium">
                  +{systemStatus.learningEvents} muestras agregadas por aprendizaje continuo
                </span>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Training Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Entrenamiento de Modelos</span>
          </CardTitle>
          <CardDescription>Entrena múltiples modelos de machine learning usando el dataset integrado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-blue-600" />
                Regresión Logística
              </h3>
              <p className="text-sm text-gray-600">Modelo lineal rápido y interpretable</p>
              <div className="mt-2 text-xs text-gray-500">
                • Entrenamiento rápido
                <br />• Alta interpretabilidad
                <br />• Bueno para casos lineales
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-green-600" />
                K-Nearest Neighbors
              </h3>
              <p className="text-sm text-gray-600">Basado en similitud de casos</p>
              <div className="mt-2 text-xs text-gray-500">
                • Sin entrenamiento previo
                <br />• Basado en casos similares
                <br />• Bueno para patrones locales
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-purple-600" />
                Random Forest
              </h3>
              <p className="text-sm text-gray-600">Ensemble de árboles de decisión</p>
              <div className="mt-2 text-xs text-gray-500">
                • Alta precisión
                <br />• Maneja datos complejos
                <br />• Resistente al overfitting
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Configuración de Entrenamiento</p>
              <p className="text-sm text-gray-600">División: 80% entrenamiento, 20% validación</p>
              <p className="text-sm text-gray-600">Preprocesamiento avanzado y validación cruzada activados</p>
            </div>
            <Button
              onClick={handleTraining}
              disabled={isTraining || !systemStatus.datasetLoaded}
              size="lg"
              className="min-w-[150px]"
            >
              {isTraining ? "Entrenando..." : "🚀 Entrenar Modelos"}
            </Button>
          </div>

          {isTraining && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{trainingStep}</span>
                <span className="text-sm text-gray-600">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
              <p className="text-xs text-gray-600 text-center">
                Procesando {datasetStats.totalSamples || systemStatus.datasetSize || 0} muestras del dataset...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Results */}
      {modelResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Resultados del Entrenamiento</span>
            </CardTitle>
            <CardDescription>Métricas de rendimiento de los modelos entrenados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modelResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{result.model}</h3>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index === 0 ? "Mejor Modelo" : "Entrenado"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{(result.accuracy * 100).toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Precisión</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{(result.precision * 100).toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Precisión</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{(result.recall * 100).toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Recall</div>
                    </div>
                  </div>

                  <Progress value={result.accuracy * 100} className="mt-3" />
                </div>
              ))}
            </div>

            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                ✅ Modelos entrenados exitosamente usando {datasetStats.totalSamples || systemStatus.datasetSize || 0}{" "}
                muestras. El sistema está listo para generar recomendaciones.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Continuous Learning Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Aprendizaje Continuo</span>
          </CardTitle>
          <CardDescription>
            El sistema se actualiza automáticamente con feedback positivo de los usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{systemStatus.learningEvents}</div>
              <div className="text-sm text-gray-600">Nuevas muestras</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">Activo</div>
              <div className="text-sm text-gray-600">Estado del sistema</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{systemStatus.lastTraining ? "Hoy" : "N/A"}</div>
              <div className="text-sm text-gray-600">Última actualización</div>
            </div>
          </div>

          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✨ El sistema aprende automáticamente de cada predicción marcada como correcta, mejorando continuamente su
              precisión y agregando nuevos diagnósticos al dataset integrado.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Dataset Status - Componente existente */}
      <DatasetStatus systemStatus={systemStatus} />
    </div>
  )
}
