"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Activity, Target, Clock, Brain } from "lucide-react"

interface AnalyticsTabProps {
  systemStatus: {
    datasetLoaded: boolean
    modelsTrained: boolean
    lastTraining: string | null
  }
}

export default function AnalyticsTab({ systemStatus }: AnalyticsTabProps) {
  // Mock data for demonstration
  const modelPerformance = [
    { model: "Random Forest", accuracy: 89.2, predictions: 1247 },
    { model: "Regresión Logística", accuracy: 83.4, predictions: 892 },
    { model: "K-Nearest Neighbors", accuracy: 79.8, predictions: 634 },
  ]

  const topMedications = [
    { name: "Paracetamol", count: 324, percentage: 25.9 },
    { name: "Ibuprofeno", count: 287, percentage: 23.0 },
    { name: "Amoxicilina", count: 198, percentage: 15.8 },
    { name: "Omeprazol", count: 156, percentage: 12.5 },
    { name: "Metformina", count: 134, percentage: 10.7 },
  ]

  const diagnosisDistribution = [
    { diagnosis: "Hipertensión", count: 234, color: "bg-blue-500" },
    { diagnosis: "Diabetes", count: 198, color: "bg-green-500" },
    { diagnosis: "Infección respiratoria", count: 167, color: "bg-yellow-500" },
    { diagnosis: "Gastritis", count: 145, color: "bg-purple-500" },
    { diagnosis: "Asma", count: 123, color: "bg-red-500" },
  ]

  const recentMetrics = {
    totalPredictions: 2847,
    accuracyRate: 87.3,
    positiveFeedback: 94.2,
    avgConfidence: 82.1,
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Predicciones</p>
                <p className="text-3xl font-bold">{recentMetrics.totalPredictions.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Precisión Promedio</p>
                <p className="text-3xl font-bold">{recentMetrics.accuracyRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Feedback Positivo</p>
                <p className="text-3xl font-bold">{recentMetrics.positiveFeedback}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confianza Promedio</p>
                <p className="text-3xl font-bold">{recentMetrics.avgConfidence}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nuevos Diagnósticos</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <Brain className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Progreso de Aprendizaje</span>
          </CardTitle>
          <CardDescription>Evolución del sistema a través del aprendizaje continuo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Diagnósticos Agregados Recientemente</h3>
                <div className="space-y-2">
                  {[
                    { diagnosis: "Fibromialgia", samples: 3, confidence: "89%" },
                    { diagnosis: "Síndrome del túnel carpiano", samples: 2, confidence: "92%" },
                    { diagnosis: "Migraña crónica", samples: 5, confidence: "87%" },
                    { diagnosis: "Artritis reumatoide", samples: 4, confidence: "91%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{item.diagnosis}</div>
                        <div className="text-xs text-gray-600">{item.samples} muestras</div>
                      </div>
                      <Badge variant="outline">{item.confidence}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Mejoras de Precisión</h3>
                <div className="space-y-3">
                  {[
                    { model: "Random Forest", before: 89.2, after: 91.7, improvement: "+2.5%" },
                    { model: "Regresión Logística", before: 83.4, after: 85.1, improvement: "+1.7%" },
                    { model: "K-Nearest Neighbors", before: 79.8, after: 81.3, improvement: "+1.5%" },
                  ].map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{item.model}</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {item.improvement}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{item.before}%</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-green-500 h-1 rounded-full"
                            style={{ width: `${(item.after / 100) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{item.after}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Rendimiento de Modelos</span>
          </CardTitle>
          <CardDescription>Comparación de precisión y uso de los diferentes modelos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelPerformance.map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{model.model}</span>
                    {index === 0 && <Badge>Mejor</Badge>}
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{model.accuracy}%</span>
                    <span className="text-sm text-gray-600 ml-2">({model.predictions} predicciones)</span>
                  </div>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Medications */}
        <Card>
          <CardHeader>
            <CardTitle>Medicamentos Más Recetados</CardTitle>
            <CardDescription>Distribución de las recomendaciones más frecuentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMedications.map((med, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <span className="font-medium">{med.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{med.count}</div>
                    <div className="text-sm text-gray-600">{med.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Diagnósticos</CardTitle>
            <CardDescription>Casos más comunes en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diagnosisDistribution.map((diag, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{diag.diagnosis}</span>
                    <span className="font-bold">{diag.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${diag.color}`}
                      style={{ width: `${(diag.count / 234) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Actividad Reciente</span>
          </CardTitle>
          <CardDescription>Últimas interacciones con el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "Hace 2 min",
                action: "Predicción generada",
                patient: "P-2847",
                medication: "Paracetamol",
                confidence: "92%",
              },
              {
                time: "Hace 5 min",
                action: "Feedback positivo",
                patient: "P-2846",
                medication: "Ibuprofeno",
                confidence: "87%",
              },
              {
                time: "Hace 8 min",
                action: "Predicción generada",
                patient: "P-2845",
                medication: "Amoxicilina",
                confidence: "94%",
              },
              {
                time: "Hace 12 min",
                action: "Predicción generada",
                patient: "P-2844",
                medication: "Omeprazol",
                confidence: "89%",
              },
              {
                time: "Hace 15 min",
                action: "Feedback positivo",
                patient: "P-2843",
                medication: "Metformina",
                confidence: "91%",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      {activity.patient} → {activity.medication}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{activity.confidence}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
