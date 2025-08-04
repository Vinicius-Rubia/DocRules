import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KEYS } from "@/constants/local-storage-keys";
import { Download, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DataManagment() {
  const [isImporting, setIsImporting] = useState(false);
  const navigate = useNavigate();

  const handleExportData = () => {
    try {
      const dataToExport: Record<string, any> = {};

      Object.values(KEYS).forEach((key) => {
        const data = localStorage.getItem(key);
        dataToExport[key] = data ? JSON.parse(data) : null;
      });

      const jsonString = JSON.stringify(dataToExport, null, 2);

      const blob = new Blob([jsonString], { type: "application/json" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "quod-regras.json";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Sucesso!", {
        description: "Os dados foram exportados com sucesso.",
      });
    } catch (error) {
      toast.error("Erro na Exportação", {
        description:
          "Não foi possível exportar os dados. Tente novamente mais tarde.",
      });
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImporting(true);
    const file = event.target.files?.[0];

    if (!file) {
      setIsImporting(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== "string") {
          toast.error("Erro na Importação", {
            description: "O conteúdo do arquivo não é válido.",
          });
          return;
        }

        const importedData = JSON.parse(text);

        const expectedKeys = Object.values(KEYS);
        const importedKeys = Object.keys(importedData);

        const hasAllKeys = expectedKeys.every((key) =>
          importedKeys.includes(key)
        );
        if (!hasAllKeys) {
          toast.error("Erro na Importação", {
            description:
              "O arquivo parece estar corrompido ou em um formato incorreto.",
          });
          return;
        }

        expectedKeys.forEach((key) => {
          const dataToStore = importedData[key];
          localStorage.setItem(key, JSON.stringify(dataToStore || []));
        });

        toast.success("Sucesso!", {
          description: "Os dados foram importados. Você já ver as mudanças.",
        });
        navigate("/");
      } catch (error) {
        toast.error("Erro na Importação", {
          description:
            "Ocorreu um erro desconhecido. Tente novamente mais tarde.",
        });
      } finally {
        setIsImporting(false);
        event.target.value = "";
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-6 mt-4 border rounded-lg bg-card text-card-foreground">
      <h2 className="text-lg font-semibold mb-4">Gerenciamento de Dados</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleExportData} className="w-full sm:w-auto">
          <Download className="mr-2 size-4" />
          Exportar Dados (.json)
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto cursor-pointer"
        >
          <label htmlFor="import-file">
            <Upload className="mr-2 size-4" />
            {isImporting ? "Importando..." : "Importar Dados"}
            <Input
              id="import-file"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportData}
              disabled={isImporting}
            />
          </label>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        <strong>Atenção:</strong> A importação substituirá todos os dados
        existentes de clientes, módulos e regras.
      </p>
    </div>
  );
}
