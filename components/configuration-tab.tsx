"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Database, Brain, Trash2, RefreshCw, AlertTriangle, HardDrive } from "lucide-react"

interface ConfigurationTabProps {
  systemStatus: {
    datasetLoaded: boolean
    modelsTrained: boolean
    lastTraining: string | null
  }
  onStatusChange: (status: any) => void
}

export default function ConfigurationTab({ systemStatus, onStatusChange }: ConfigurationTabProps) {
  const [autoBackup, setAutoBackup] = useState(true)
  const [advancedPreprocessing, setAdvancedPreprocessing] = useState(true)
  const [feedbackCollection, setFeedbackCollection] = useState(true)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const systemFiles = [
    { name: "logistic_model.pkl", size: "2.3 MB", type: "Modelo", status: "active" },
    { name: "random_forest_model.pkl", size: "8.7 MB", type: "Modelo", status: "active" },
    { name: "knn_model.pkl", size: "1.8 MB", type: "Modelo", status: "active" },
    { name: "label_encoder.pkl", size: "0.1 MB", type: "Codificador", status: "active" },
    { name: "interaction_log.csv", size: "0.5 MB", type: "Datos", status: "active" },
    { name: "performance_log.json", size: "0.02 MB", type: "Métricas", status: "active" },
    { name: "current_dataset.pkl", size: "12.4 MB", type: "Dataset", status: "active" },
  ]

  const handleClearDataset = () => {
    onStatusChange({
      ...systemStatus,
      datasetLoaded: false,
    })
  }

  const handleClearModels = () => {
    onStatusChange({
      ...systemStatus,
      modelsTrained: false,
      lastTraining: null,
    })
  }

  const handleSystemReset = () => {
    onStatusChange({
      datasetLoaded: false,
      modelsTrained: false,
      lastTraining: null,
    })
    setShowConfirmReset(false)
  }

  return (
    <div className="space-y-6">
      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Estado del Sistema</span>
          </CardTitle>
          <CardDescription>Información general sobre el estado actual del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Dataset</span>
                </div>
                <div className="flex items-center space-x-2">
                  {systemStatus.datasetLoaded ? (
                    <>
                      <Badge variant="default">Cargado</Badge>
                      <Button variant="outline" size="sm" onClick={handleClearDataset}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Limpiar
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary">No cargado</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4" />
                  <span className="font-medium">Modelos</span>
                </div>
                <div className="flex items-center space-x-2">
                  {systemStatus.modelsTrained ? (
                    <>
                      <Badge variant="default">Entrenados</Badge>
                      <Button variant="outline" size="sm" onClick={handleClearModels}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Limpiar
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary">No entrenados</Badge>
                  )}
                </div>
              </div>

              {systemStatus.lastTraining && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Último entrenamiento:</span>
                  <br />
                  {new Date(systemStatus.lastTraining).toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Archivos del Sistema</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {systemFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-gray-600">{file.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{file.size}</div>
                      <Badge variant="outline" className="text-xs">
                        {file.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
          <CardDescription>Ajusta el comportamiento y las características del sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-backup">Respaldo Automático</Label>
                <p className="text-sm text-gray-600">
                  Guarda automáticamente copias de seguridad del dataset y modelos
                </p>
              </div>
              <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="advanced-preprocessing">Preprocesamiento Avanzado</Label>
                <p className="text-sm text-gray-600">Aplica técnicas avanzadas de ingeniería de características</p>
              </div>
              <Switch
                id="advanced-preprocessing"
                checked={advancedPreprocessing}
                onCheckedChange={setAdvancedPreprocessing}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="feedback-collection">Recolección de Feedback</Label>
                <p className="text-sm text-gray-600">Registra el feedback de los usuarios para mejorar el modelo</p>
              </div>
              <Switch id="feedback-collection" checked={feedbackCollection} onCheckedChange={setFeedbackCollection} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="continuous-learning">Aprendizaje Continuo</Label>
                <p className="text-sm text-gray-600">Actualiza automáticamente los modelos con feedback positivo</p>
              </div>
              <Switch id="continuous-learning" checked={true} onCheckedChange={() => {}} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-diagnosis-update">Diagnósticos Dinámicos</Label>
                <p className="text-sm text-gray-600">Permite agregar nuevos diagnósticos automáticamente</p>
              </div>
              <Switch id="auto-diagnosis-update" checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5" />
            <span>Gestión de Datos</span>
          </CardTitle>
          <CardDescription>Herramientas para limpiar y gestionar los datos del sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar Historial de Interacciones
            </Button>

            <Button variant="outline" className="justify-start bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Métricas de Rendimiento
            </Button>

            <Button variant="outline" className="justify-start bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Optimizar Base de Datos
            </Button>

            <Button variant="outline" className="justify-start bg-transparent">
              <Database className="h-4 w-4 mr-2" />
              Exportar Datos de Entrenamiento
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Gestión de Diagnósticos</span>
          </CardTitle>
          <CardDescription>Administra los diagnósticos disponibles en el sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Diagnósticos Disponibles ({10 + 4})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {[
                // Diagnósticos originales
                { name: "Hipertensión", type: "original", samples: 234 },
                { name: "Diabetes", type: "original", samples: 198 },
                { name: "Infección respiratoria", type: "original", samples: 167 },
                { name: "Gastritis", type: "original", samples: 145 },
                { name: "Asma", type: "original", samples: 123 },
                { name: "Dolor muscular", type: "original", samples: 98 },
                { name: "Fiebre", type: "original", samples: 87 },
                { name: "Alergia", type: "original", samples: 76 },
                { name: "EPOC", type: "original", samples: 65 },
                { name: "Insuficiencia renal", type: "original", samples: 54 },
                // Diagnósticos agregados por aprendizaje
                { name: "Fibromialgia", type: "learned", samples: 3 },
                { name: "Síndrome del túnel carpiano", type: "learned", samples: 2 },
                { name: "Migraña crónica", type: "learned", samples: 5 },
                { name: "Artritis reumatoide", type: "learned", samples: 4 },
              ].map((diagnosis, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <div className="flex items-center space-x-2">
                    <span>{diagnosis.name}</span>
                    {diagnosis.type === "learned" && (
                      <Badge variant="secondary" className="text-xs">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                  <span className="text-gray-600">{diagnosis.samples}</span>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              Los diagnósticos marcados como "Nuevo" fueron agregados automáticamente a través del aprendizaje continuo
              del sistema.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* System Reset */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Zona de Peligro</span>
          </CardTitle>
          <CardDescription>Acciones irreversibles que afectan todo el sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showConfirmReset ? (
            <Button variant="destructive" onClick={() => setShowConfirmReset(true)} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Restablecer Sistema Completo
            </Button>
          ) : (
            <Alert className="border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-3">
                  <p className="font-medium">⚠️ Esta acción eliminará permanentemente:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Todos los modelos entrenados</li>
                    <li>Dataset cargado</li>
                    <li>Historial de interacciones</li>
                    <li>Métricas de rendimiento</li>
                    <li>Configuraciones personalizadas</li>
                  </ul>
                  <div className="flex space-x-2 pt-2">
                    <Button variant="destructive" size="sm" onClick={handleSystemReset}>
                      Confirmar Restablecimiento
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowConfirmReset(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
          <CardDescription>Detalles técnicos y de configuración</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Configuración Técnica</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Versión del Sistema:</span>
                  <span className="font-mono">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Modelos Disponibles:</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span>Características de Entrada:</span>
                  <span>28</span>
                </div>
                <div className="flex justify-between">
                  <span>Medicamentos Únicos:</span>
                  <span>15</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Estadísticas de Uso</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Predicciones:</span>
                  <span>2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Precisión Promedio:</span>
                  <span>87.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiempo de Respuesta:</span>
                  <span>~0.2s</span>
                </div>
                <div className="flex justify-between">
                  <span>Última Actualización:</span>
                  <span>Hoy</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
