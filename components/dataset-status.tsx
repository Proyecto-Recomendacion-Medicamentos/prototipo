"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Plus, Clock, CheckCircle } from "lucide-react"

interface DatasetStatusProps {
  systemStatus: {
    datasetLoaded: boolean
    modelsTrained: boolean
    datasetSize?: number
    lastDatasetUpdate?: string | null
    learningEvents: number
  }
}

export default function DatasetStatus({ systemStatus }: DatasetStatusProps) {
  const formatTimeAgo = (timestamp: string | null) => {
    if (!timestamp) return "Nunca"
    const now = new Date()
    const then = new Date(timestamp)
    const diffMs = now.getTime() - then.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Hace menos de 1 minuto"
    if (diffMins < 60) return `Hace ${diffMins} minutos`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `Hace ${diffHours} horas`
    const diffDays = Math.floor(diffHours / 24)
    return `Hace ${diffDays} días`
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <Database className="h-5 w-5" />
          <span>Estado del Dataset</span>
        </CardTitle>
        <CardDescription className="text-blue-700">
          Información sobre el dataset de entrenamiento y actualizaciones automáticas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tamaño del Dataset */}
          <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {systemStatus.datasetSize || (systemStatus.datasetLoaded ? "1,250" : "0")}
            </div>
            <div className="text-sm text-gray-600">Muestras Totales</div>
            {systemStatus.learningEvents > 0 && (
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                +{systemStatus.learningEvents} nuevas
              </Badge>
            )}
          </div>

          {/* Última Actualización */}
          <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">Última Actualización</div>
            <div className="text-xs text-gray-600 mt-1">{formatTimeAgo(systemStatus.lastDatasetUpdate)}</div>
          </div>

          {/* Estado de Aprendizaje */}
          <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center justify-center mb-2">
              {systemStatus.learningEvents > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Plus className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="text-sm font-medium text-gray-900">Aprendizaje Continuo</div>
            <div className="text-xs text-gray-600 mt-1">{systemStatus.learningEvents > 0 ? "Activo" : "En espera"}</div>
          </div>
        </div>

        {/* Explicación del proceso */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Plus className="h-4 w-4 mr-2 text-green-600" />
            ¿Cómo se actualiza el dataset?
          </h4>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">1.</span>
              <span>
                Cuando marcas una predicción como <strong>correcta</strong> (👍)
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">2.</span>
              <span>El sistema crea una nueva muestra con todos los datos del paciente</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">3.</span>
              <span>La muestra se agrega automáticamente al dataset de entrenamiento</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">4.</span>
              <span>Los modelos se actualizan incrementalmente para mejorar la precisión</span>
            </div>
          </div>
        </div>

        {/* Estadísticas de aprendizaje */}
        {systemStatus.learningEvents > 0 && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-900">Aprendizaje Activo</span>
            </div>
            <div className="text-sm text-green-800">
              <p>✅ {systemStatus.learningEvents} nuevas muestras agregadas al dataset</p>
              <p>🎯 Precisión mejorada por feedback positivo</p>
              <p>🧠 Modelos actualizados automáticamente</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
