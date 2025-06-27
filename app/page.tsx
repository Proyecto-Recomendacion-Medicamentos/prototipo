"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Activity, Brain, BarChart3, Settings, Pill, PieChart, Database } from "lucide-react"
import PredictionTab from "@/components/prediction-tab"
import TrainingTab from "@/components/training-tab"
import AnalyticsTab from "@/components/analytics-tab"
import ConfigurationTab from "@/components/configuration-tab"
import DashboardTab from "@/components/dashboard-tab"
import DatasetViewer from "@/components/dataset-viewer"
import { datasetManager } from "@/lib/dataset-manager"

export default function MedicationSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [systemStatus, setSystemStatus] = useState({
    datasetLoaded: false,
    modelsTrained: false,
    lastTraining: null,
    totalPredictions: 2847,
    accuracyRate: 87.3,
    newDiagnoses: 7,
    learningEvents: 0,
    datasetSize: 0,
    lastDatasetUpdate: null,
  })

  // Cargar dataset inicial al montar el componente
  useEffect(() => {
    const loadInitialData = async () => {
      const loaded = await datasetManager.loadInitialDataset()
      if (loaded) {
        const stats = datasetManager.getStats()
        setSystemStatus((prev) => ({
          ...prev,
          datasetLoaded: true,
          datasetSize: stats.totalSamples,
          lastDatasetUpdate: stats.lastUpdated,
        }))
      }
    }

    loadInitialData()
  }, [])

  const updateSystemStatus = (updates: any) => {
    setSystemStatus((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema Inteligente de Medicamentos</h1>
                <p className="text-sm text-gray-600">Recomendaciones basadas en datos clínicos completos</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={systemStatus.modelsTrained ? "default" : "secondary"}>
                {systemStatus.modelsTrained ? "Modelos Activos" : "Sin Entrenar"}
              </Badge>
              <Badge variant={systemStatus.datasetLoaded ? "default" : "outline"}>
                {systemStatus.datasetLoaded ? `Dataset: ${systemStatus.datasetSize} muestras` : "Sin Dataset"}
              </Badge>
              {systemStatus.learningEvents > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  +{systemStatus.learningEvents} Aprendizajes
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Predicción</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Entrenamiento</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analíticas</span>
            </TabsTrigger>
            <TabsTrigger value="dataset" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Dataset</span>
            </TabsTrigger>
            <TabsTrigger value="configuration" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardTab systemStatus={systemStatus} onStatusChange={updateSystemStatus} />
          </TabsContent>

          <TabsContent value="prediction" className="space-y-6">
            <PredictionTab systemStatus={systemStatus} onStatusChange={updateSystemStatus} />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <TrainingTab systemStatus={systemStatus} onStatusChange={updateSystemStatus} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab systemStatus={systemStatus} />
          </TabsContent>

          <TabsContent value="dataset" className="space-y-6">
            <DatasetViewer systemStatus={systemStatus} />
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <ConfigurationTab systemStatus={systemStatus} onStatusChange={updateSystemStatus} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="flex items-center justify-center space-x-2">
              <Pill className="h-4 w-4" />
              <span>Sistema Inteligente de Recomendación de Medicamentos</span>
            </p>
            <p className="mt-1">Dataset integrado con aprendizaje continuo automático</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
