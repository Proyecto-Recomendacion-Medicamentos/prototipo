"use client"

interface DatasetSample {
  patient_id: string
  age: number
  sex: string
  weight: number
  height: number
  systolic_bp: number
  diastolic_bp: number
  glucose: number
  temperature: number
  heart_rate: number
  oxygen_saturation: number
  fever: boolean
  cough: boolean
  headache: boolean
  fatigue: boolean
  chest_pain: boolean
  breathing_difficulty: boolean
  abdominal_pain: boolean
  vomiting: boolean
  diarrhea: boolean
  dizziness: boolean
  blurred_vision: boolean
  muscle_pain: boolean
  rash: boolean
  swelling: boolean
  diabetes: boolean
  hypertension: boolean
  asthma: boolean
  copd: boolean
  kidney_disease: boolean
  drug_allergy: boolean
  penicillin_allergy: boolean
  nsaid_allergy: boolean
  diagnosis: string
  recommended_medication: string
  confidence: number
  feedback: string
  timestamp: string
}

interface DatasetMetadata {
  version: string
  created: string
  lastUpdated: string
  totalSamples: number
  originalSamples: number
  learnedSamples: number
  columns: string[]
  diagnoses: string[]
  medications: string[]
}

class DatasetManager {
  private samples: DatasetSample[] = []
  private metadata: DatasetMetadata = {
    version: "1.0.0",
    created: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    totalSamples: 0,
    originalSamples: 0,
    learnedSamples: 0,
    columns: [
      "patient_id",
      "age",
      "sex",
      "weight",
      "height",
      "systolic_bp",
      "diastolic_bp",
      "glucose",
      "temperature",
      "heart_rate",
      "oxygen_saturation",
      "fever",
      "cough",
      "headache",
      "fatigue",
      "chest_pain",
      "breathing_difficulty",
      "abdominal_pain",
      "vomiting",
      "diarrhea",
      "dizziness",
      "blurred_vision",
      "muscle_pain",
      "rash",
      "swelling",
      "diabetes",
      "hypertension",
      "asthma",
      "copd",
      "kidney_disease",
      "drug_allergy",
      "penicillin_allergy",
      "nsaid_allergy",
      "diagnosis",
      "recommended_medication",
      "confidence",
      "feedback",
      "timestamp",
    ],
    diagnoses: [
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
    ],
    medications: [
      "Paracetamol",
      "Ibuprofeno",
      "Amoxicilina",
      "Omeprazol",
      "Metformina",
      "Enalapril",
      "Salbutamol",
      "Loratadina",
      "Prednisona",
      "Furosemida",
    ],
  }

  async loadInitialDataset() {
    try {
      // Cargar dataset simulado en lugar de archivos externos
      this.loadSimulatedDataset()
      return true
    } catch (error) {
      console.error("Error loading dataset:", error)
      return false
    }
  }

  private loadSimulatedDataset() {
    // Dataset simulado con 100 muestras realistas
    const simulatedSamples: DatasetSample[] = [
      {
        patient_id: "P001",
        age: 45,
        sex: "M",
        weight: 80,
        height: 175,
        systolic_bp: 140,
        diastolic_bp: 90,
        glucose: 110,
        temperature: 36.8,
        heart_rate: 75,
        oxygen_saturation: 98,
        fever: false,
        cough: false,
        headache: true,
        fatigue: false,
        chest_pain: false,
        breathing_difficulty: false,
        abdominal_pain: false,
        vomiting: false,
        diarrhea: false,
        dizziness: true,
        blurred_vision: false,
        muscle_pain: false,
        rash: false,
        swelling: false,
        diabetes: false,
        hypertension: true,
        asthma: false,
        copd: false,
        kidney_disease: false,
        drug_allergy: false,
        penicillin_allergy: false,
        nsaid_allergy: false,
        diagnosis: "Hipertensión",
        recommended_medication: "Enalapril",
        confidence: 0.89,
        feedback: "original",
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        patient_id: "P002",
        age: 32,
        sex: "F",
        weight: 65,
        height: 160,
        systolic_bp: 120,
        diastolic_bp: 80,
        glucose: 180,
        temperature: 36.5,
        heart_rate: 80,
        oxygen_saturation: 99,
        fever: false,
        cough: false,
        headache: false,
        fatigue: true,
        chest_pain: false,
        breathing_difficulty: false,
        abdominal_pain: false,
        vomiting: false,
        diarrhea: false,
        dizziness: false,
        blurred_vision: true,
        muscle_pain: false,
        rash: false,
        swelling: false,
        diabetes: true,
        hypertension: false,
        asthma: false,
        copd: false,
        kidney_disease: false,
        drug_allergy: false,
        penicillin_allergy: false,
        nsaid_allergy: false,
        diagnosis: "Diabetes",
        recommended_medication: "Metformina",
        confidence: 0.92,
        feedback: "original",
        timestamp: "2024-01-15T11:15:00Z",
      },
      {
        patient_id: "P003",
        age: 28,
        sex: "M",
        weight: 70,
        height: 180,
        systolic_bp: 115,
        diastolic_bp: 75,
        glucose: 95,
        temperature: 38.2,
        heart_rate: 90,
        oxygen_saturation: 96,
        fever: true,
        cough: true,
        headache: false,
        fatigue: true,
        chest_pain: false,
        breathing_difficulty: true,
        abdominal_pain: false,
        vomiting: false,
        diarrhea: false,
        dizziness: false,
        blurred_vision: false,
        muscle_pain: false,
        rash: false,
        swelling: false,
        diabetes: false,
        hypertension: false,
        asthma: false,
        copd: false,
        kidney_disease: false,
        drug_allergy: false,
        penicillin_allergy: false,
        nsaid_allergy: false,
        diagnosis: "Infección respiratoria",
        recommended_medication: "Amoxicilina",
        confidence: 0.87,
        feedback: "original",
        timestamp: "2024-01-15T12:00:00Z",
      },
    ]

    // Generar más muestras simuladas
    for (let i = 4; i <= 100; i++) {
      const diagnoses = this.metadata.diagnoses
      const medications = this.metadata.medications
      const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]
      const randomMedication = medications[Math.floor(Math.random() * medications.length)]

      const sample: DatasetSample = {
        patient_id: `P${i.toString().padStart(3, "0")}`,
        age: Math.floor(Math.random() * 60) + 20,
        sex: Math.random() > 0.5 ? "M" : "F",
        weight: Math.floor(Math.random() * 50) + 50,
        height: Math.floor(Math.random() * 40) + 150,
        systolic_bp: Math.floor(Math.random() * 60) + 100,
        diastolic_bp: Math.floor(Math.random() * 40) + 60,
        glucose: Math.floor(Math.random() * 200) + 70,
        temperature: Math.round((Math.random() * 3 + 36) * 10) / 10,
        heart_rate: Math.floor(Math.random() * 60) + 60,
        oxygen_saturation: Math.floor(Math.random() * 15) + 85,
        fever: Math.random() > 0.7,
        cough: Math.random() > 0.6,
        headache: Math.random() > 0.5,
        fatigue: Math.random() > 0.4,
        chest_pain: Math.random() > 0.8,
        breathing_difficulty: Math.random() > 0.7,
        abdominal_pain: Math.random() > 0.6,
        vomiting: Math.random() > 0.8,
        diarrhea: Math.random() > 0.7,
        dizziness: Math.random() > 0.6,
        blurred_vision: Math.random() > 0.8,
        muscle_pain: Math.random() > 0.5,
        rash: Math.random() > 0.9,
        swelling: Math.random() > 0.8,
        diabetes: Math.random() > 0.8,
        hypertension: Math.random() > 0.7,
        asthma: Math.random() > 0.9,
        copd: Math.random() > 0.95,
        kidney_disease: Math.random() > 0.95,
        drug_allergy: Math.random() > 0.9,
        penicillin_allergy: Math.random() > 0.95,
        nsaid_allergy: Math.random() > 0.95,
        diagnosis: randomDiagnosis,
        recommended_medication: randomMedication,
        confidence: Math.round((Math.random() * 0.3 + 0.7) * 100) / 100,
        feedback: "original",
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      }

      simulatedSamples.push(sample)
    }

    this.samples = simulatedSamples
    this.metadata.totalSamples = this.samples.length
    this.metadata.originalSamples = this.samples.length
    this.metadata.lastUpdated = new Date().toISOString()
  }

  addSample(newSample: Partial<DatasetSample>) {
    const completeSample: DatasetSample = {
      patient_id: newSample.patient_id || `P${Date.now()}`,
      age: newSample.age || 0,
      sex: newSample.sex || "M",
      weight: newSample.weight || 0,
      height: newSample.height || 0,
      systolic_bp: newSample.systolic_bp || 0,
      diastolic_bp: newSample.diastolic_bp || 0,
      glucose: newSample.glucose || 0,
      temperature: newSample.temperature || 36.5,
      heart_rate: newSample.heart_rate || 0,
      oxygen_saturation: newSample.oxygen_saturation || 0,
      fever: newSample.fever || false,
      cough: newSample.cough || false,
      headache: newSample.headache || false,
      fatigue: newSample.fatigue || false,
      chest_pain: newSample.chest_pain || false,
      breathing_difficulty: newSample.breathing_difficulty || false,
      abdominal_pain: newSample.abdominal_pain || false,
      vomiting: newSample.vomiting || false,
      diarrhea: newSample.diarrhea || false,
      dizziness: newSample.dizziness || false,
      blurred_vision: newSample.blurred_vision || false,
      muscle_pain: newSample.muscle_pain || false,
      rash: newSample.rash || false,
      swelling: newSample.swelling || false,
      diabetes: newSample.diabetes || false,
      hypertension: newSample.hypertension || false,
      asthma: newSample.asthma || false,
      copd: newSample.copd || false,
      kidney_disease: newSample.kidney_disease || false,
      drug_allergy: newSample.drug_allergy || false,
      penicillin_allergy: newSample.penicillin_allergy || false,
      nsaid_allergy: newSample.nsaid_allergy || false,
      diagnosis: newSample.diagnosis || "",
      recommended_medication: newSample.recommended_medication || "",
      confidence: newSample.confidence || 0,
      feedback: newSample.feedback || "positive",
      timestamp: newSample.timestamp || new Date().toISOString(),
    }

    this.samples.push(completeSample)
    this.metadata.totalSamples = this.samples.length
    this.metadata.learnedSamples += 1
    this.metadata.lastUpdated = new Date().toISOString()

    // Agregar nuevo diagnóstico si no existe
    if (completeSample.diagnosis && !this.metadata.diagnoses.includes(completeSample.diagnosis)) {
      this.metadata.diagnoses.push(completeSample.diagnosis)
    }

    // Agregar nuevo medicamento si no existe
    if (
      completeSample.recommended_medication &&
      !this.metadata.medications.includes(completeSample.recommended_medication)
    ) {
      this.metadata.medications.push(completeSample.recommended_medication)
    }

    return completeSample
  }

  getSamples() {
    return this.samples
  }

  getMetadata() {
    return this.metadata
  }

  getStats() {
    return {
      totalSamples: this.metadata.totalSamples,
      originalSamples: this.metadata.originalSamples,
      learnedSamples: this.metadata.learnedSamples,
      diagnoses: this.metadata.diagnoses.length,
      medications: this.metadata.medications.length,
      lastUpdated: this.metadata.lastUpdated,
    }
  }

  exportToCSV() {
    const headers = this.metadata.columns
    const csvContent = [
      headers.join(","),
      ...this.samples.map((sample) =>
        headers
          .map((header) => {
            const value = sample[header as keyof DatasetSample]
            if (typeof value === "boolean") {
              return value ? "1" : "0"
            }
            return value?.toString() || ""
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }

  downloadCSV(filename = "updated-dataset.csv") {
    const csvContent = this.exportToCSV()
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  exportMetadata() {
    return JSON.stringify(this.metadata, null, 2)
  }
}

export const datasetManager = new DatasetManager()
export type { DatasetSample, DatasetMetadata }
