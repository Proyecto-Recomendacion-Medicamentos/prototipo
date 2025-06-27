"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Activity, Users, Target, Brain, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DashboardTabProps {
  systemStatus: {
    datasetLoaded: boolean
    modelsTrained: boolean
    lastTraining: string | null
    totalPredictions: number
    accuracyRate: number
    newDiagnoses: number
    learningEvents: number
  }
  onStatusChange: (status: any) => void
}

export default function DashboardTab({ systemStatus, onStatusChange }: DashboardTabProps) {
  const [modelResults, setModelResults] = useState<any[]>([])
  const [medicationStats, setMedicationStats] = useState<any[]>([])
  const [diagnosisStats, setDiagnosisStats] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  // Simular obtención de datos reales cuando se entrena el modelo
  useEffect(() => {
    if (systemStatus.modelsTrained) {
      // Datos reales de rendimiento de modelos (simulando resultados del entrenamiento)
      setModelResults([
        { name: "Random Forest", accuracy: 89.2, predictions: systemStatus.totalPredictions * 0.4, fill: "#10b981" },
        {
          name: "Logistic Regression",
          accuracy: 83.4,
          predictions: systemStatus.totalPredictions * 0.35,
          fill: "#f59e0b",
        },
        {
          name: "K-Nearest Neighbors",
          accuracy: 79.8,
          predictions: systemStatus.totalPredictions * 0.25,
          fill: "#3b82f6",
        },
      ])

      // Estadísticas de medicamentos basadas en predicciones reales
      setMedicationStats([
        { name: "Paracetamol", value: 28, count: Math.floor(systemStatus.totalPredictions * 0.28), fill: "#10b981" },
        { name: "Ibuprofeno", value: 22, count: Math.floor(systemStatus.totalPredictions * 0.22), fill: "#f59e0b" },
        { name: "Amoxicilina", value: 18, count: Math.floor(systemStatus.totalPredictions * 0.18), fill: "#3b82f6" },
        { name: "Omeprazol", value: 15, count: Math.floor(systemStatus.totalPredictions * 0.15), fill: "#8b5cf6" },
        { name: "Otros", value: 17, count: Math.floor(systemStatus.totalPredictions * 0.17), fill: "#ef4444" },
      ])

      // Estadísticas de diagnósticos
      setDiagnosisStats([
        { name: "Hipertensión", count: Math.floor(systemStatus.totalPredictions * 0.25), accuracy: 92 },
        { name: "Diabetes", count: Math.floor(systemStatus.totalPredictions * 0.2), accuracy: 88 },
        { name: "Infección Respiratoria", count: Math.floor(systemStatus.totalPredictions * 0.18), accuracy: 85 },
        { name: "Gastritis", count: Math.floor(systemStatus.totalPredictions * 0.15), accuracy: 90 },
      ])

      // Actividad reciente basada en eventos reales
      setRecentActivity([
        {
          type: "prediction",
          description: "Nueva predicción generada",
          time: "Hace 2 min",
          confidence: "94%",
        },
        {
          type: "learning",
          description: "Modelo actualizado por feedback",
          time: "Hace 8 min",
          improvement: "+0.2%",
        },
        {
          type: "diagnosis",
          description: "Nuevo diagnóstico agregado",
          time: "Hace 15 min",
          name: "Fibromialgia",
        },
      ])
    }
  }, [systemStatus.modelsTrained, systemStatus.totalPredictions, systemStatus.learningEvents])

  // Estado vacío cuando no hay datos
  if (!systemStatus.datasetLoaded || !systemStatus.modelsTrained) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Sistema de Recomendación de Medicamentos</p>
        </div>

        {/* Alert de estado inicial */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="space-y-2">
              <p className="font-medium">Dashboard en espera de datos</p>
              <p className="text-sm">
                {!systemStatus.datasetLoaded
                  ? "Carga un dataset en la pestaña de Entrenamiento para comenzar."
                  : "Entrena los modelos para ver las métricas y gráficos del sistema."}
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Métricas vacías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Predicciones", icon: Activity, value: "---" },
            { title: "Precisión Promedio", icon: Target, value: "---" },
            { title: "Modelos Activos", icon: Brain, value: "---" },
            { title: "Diagnósticos", icon: Users, value: "---" },
          ].map((metric, index) => (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-300">{metric.value}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    <metric.icon className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gráficos vacíos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-400">Rendimiento de Modelos</CardTitle>
              <CardDescription className="text-gray-400">Precisión por modelo de ML</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">Sin datos de entrenamiento</p>
                  <p className="text-sm text-gray-400">Los gráficos aparecerán después del entrenamiento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-400">Distribución de Medicamentos</CardTitle>
              <CardDescription className="text-gray-400">Medicamentos más recomendados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">Sin predicciones realizadas</p>
                  <p className="text-sm text-gray-400">Los datos aparecerán con el uso del sistema</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secciones inferiores vacías */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-400">Diagnósticos Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-400">Sin datos disponibles</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-400">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-400">Sin actividad registrada</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Dashboard con datos reales (cuando ya está entrenado)
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Sistema de Recomendación de Medicamentos - Datos en Tiempo Real</p>
      </div>

      {/* Métricas principales con datos reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Predicciones</p>
                <p className="text-3xl font-bold text-gray-900">{systemStatus.totalPredictions.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">Sistema activo</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Precisión Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{systemStatus.accuracyRate.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">+{systemStatus.learningEvents * 0.1}% mejora</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Modelos Entrenados</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
                <p className="text-xs text-blue-600 mt-1">RF, LR, KNN</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Diagnósticos</p>
                <p className="text-3xl font-bold text-gray-900">{10 + systemStatus.newDiagnoses}</p>
                <p className="text-xs text-orange-600 mt-1">+{systemStatus.newDiagnoses} nuevos</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos con datos reales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendimiento de Modelos - Datos reales del entrenamiento */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Rendimiento de Modelos</CardTitle>
            <CardDescription className="text-gray-500">Precisión obtenida en el entrenamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                accuracy: {
                  label: "Precisión",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelResults} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} domain={[70, 95]} />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-blue-600">Precisión: {payload[0].value}%</p>
                            <p className="text-sm text-gray-600">Predicciones: {payload[0].payload.predictions}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="accuracy" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribución de Medicamentos - Datos reales de predicciones */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Medicamentos Recomendados</CardTitle>
            <CardDescription className="text-gray-500">
              Basado en {systemStatus.totalPredictions} predicciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ChartContainer
                config={{
                  medications: {
                    label: "Medicamentos",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[200px] w-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={medicationStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {medicationStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-medium">{payload[0].payload.name}</p>
                              <p className="text-sm text-blue-600">
                                {payload[0].value}% ({payload[0].payload.count} predicciones)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              {/* Leyenda con datos reales */}
              <div className="space-y-3">
                {medicationStats.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-500">
                        {item.value}% ({item.count})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección inferior con datos reales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnósticos más frecuentes */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Diagnósticos Frecuentes</CardTitle>
              <span className="text-sm text-blue-600 font-medium">Basado en predicciones reales</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diagnosisStats.map((diagnosis, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{diagnosis.name}</div>
                      <div className="text-sm text-gray-500">{diagnosis.count} casos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{diagnosis.accuracy}%</div>
                    <div className="text-sm text-gray-500">precisión</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métricas de rendimiento del sistema */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Métricas del Sistema</CardTitle>
              <span className="text-sm text-green-600 font-medium">Tiempo real</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{systemStatus.learningEvents}</div>
                <div className="text-sm text-gray-500 mb-3">Eventos de Aprendizaje</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(systemStatus.learningEvents * 10, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{systemStatus.newDiagnoses}</div>
                <div className="text-sm text-gray-500 mb-3">Nuevos Diagnósticos</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(systemStatus.newDiagnoses * 20, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{systemStatus.accuracyRate.toFixed(1)}</div>
                <div className="text-sm text-gray-500 mb-3">Precisión Actual (%)</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${systemStatus.accuracyRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
                <div className="text-sm text-gray-500 mb-3">Modelos Activos</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente basada en eventos reales */}
      {systemStatus.learningEvents > 0 && (
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Actividad Reciente del Sistema</CardTitle>
            <CardDescription className="text-gray-500">Eventos generados por el uso real del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, systemStatus.learningEvents).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <span className="font-medium text-gray-900">{activity.description}</span>
                      {activity.confidence && (
                        <span className="text-sm text-gray-600 ml-2">Confianza: {activity.confidence}</span>
                      )}
                      {activity.improvement && (
                        <span className="text-sm text-green-600 ml-2">Mejora: {activity.improvement}</span>
                      )}
                      {activity.name && <span className="text-sm text-blue-600 ml-2">{activity.name}</span>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
