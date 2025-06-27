"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, Database, RefreshCw } from "lucide-react"
import { datasetManager, type DatasetSample } from "@/lib/dataset-manager"

interface DatasetViewerProps {
  systemStatus: any
}

export default function DatasetViewer({ systemStatus }: DatasetViewerProps) {
  const [samples, setSamples] = useState<DatasetSample[]>([])
  const [filteredSamples, setFilteredSamples] = useState<DatasetSample[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [stats, setStats] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadDataset()
  }, [systemStatus.learningEvents])

  const loadDataset = async () => {
    setIsLoading(true)
    await datasetManager.loadInitialDataset()
    const allSamples = datasetManager.getSamples()
    const datasetStats = datasetManager.getStats()

    setSamples(allSamples)
    setFilteredSamples(allSamples)
    setStats(datasetStats)
    setIsLoading(false)
  }

  useEffect(() => {
    let filtered = samples

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (sample) =>
          sample.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.recommended_medication.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por tipo
    if (filterBy !== "all") {
      if (filterBy === "learned") {
        filtered = filtered.filter((sample) => sample.feedback === "positive")
      } else if (filterBy === "original") {
        filtered = filtered.filter((sample) => !sample.feedback || sample.feedback !== "positive")
      }
    }

    setFilteredSamples(filtered)
  }, [samples, searchTerm, filterBy])

  const handleDownload = () => {
    const timestamp = new Date().toISOString().split("T")[0]
    datasetManager.downloadCSV(`medication-dataset-${timestamp}.csv`)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas del Dataset */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalSamples || 0}</div>
            <div className="text-sm text-gray-600">Total Muestras</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.originalSamples || 0}</div>
            <div className="text-sm text-gray-600">Originales</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.learnedSamples || 0}</div>
            <div className="text-sm text-gray-600">Aprendidas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.diagnoses || 0}</div>
            <div className="text-sm text-gray-600">Diagnósticos</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.medications || 0}</div>
            <div className="text-sm text-gray-600">Medicamentos</div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Explorador del Dataset</span>
          </CardTitle>
          <CardDescription>Visualiza y gestiona todas las muestras del dataset de entrenamiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por ID, diagnóstico o medicamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las muestras</SelectItem>
                <SelectItem value="original">Solo originales</SelectItem>
                <SelectItem value="learned">Solo aprendidas</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={loadDataset} variant="outline" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>

            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Descargar CSV
            </Button>
          </div>

          {/* Tabla de datos */}
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white">
                  <TableRow>
                    <TableHead>ID Paciente</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead>Diagnóstico</TableHead>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Confianza</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSamples.map((sample, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{sample.patient_id}</TableCell>
                      <TableCell>{sample.age}</TableCell>
                      <TableCell>{sample.sex}</TableCell>
                      <TableCell>{sample.diagnosis}</TableCell>
                      <TableCell>{sample.recommended_medication}</TableCell>
                      <TableCell>{(sample.confidence * 100).toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge variant={sample.feedback === "positive" ? "default" : "secondary"}>
                          {sample.feedback === "positive" ? "Aprendida" : "Original"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{formatTimestamp(sample.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 text-center">
            Mostrando {filteredSamples.length} de {samples.length} muestras
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
