"use client";

import { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import Link from "next/link";

export default function ScanReceiptsPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith("image/")
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const processReceipts = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExtractedData({
      date: "2026-01-28",
      amount: "€47.50",
      category: "Office Supplies",
      vendor: "Staples Amsterdam",
      deductible: true,
      confidence: 94,
    });
    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-purple-50/20 dark:from-slate-950 dark:via-orange-950/10 dark:to-purple-950/10">
      <header className="border-b border-[rgb(var(--color-line))]/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mt-4 text-gradient">Receipt Scanner</h1>
          <p className="mt-2 text-[rgb(var(--color-text-muted))] text-lg">
            Upload receipts and let AI extract expense data
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Receipts</CardTitle>
            <CardDescription>Drag and drop receipt images or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-2xl p-16 text-center transition-all
                ${dragActive
                  ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5"
                  : "border-[rgb(var(--color-line))] hover:border-[rgb(var(--color-primary))]/50"
                }
              `}
            >
              <div className="text-6xl mb-6">📄</div>
              <p className="text-xl font-semibold mb-2">Drop your receipts here</p>
              <p className="text-[rgb(var(--color-text-muted))] mb-6">Supports JPG, PNG, WEBP</p>
              <label className="cursor-pointer">
                <Input type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} />
                <Button variant="outline" type="button">Browse Files</Button>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold">Uploaded Files ({files.length})</h3>
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[rgb(var(--color-bg))] rounded-lg">
                    <span className="font-medium">{file.name}</span>
                    <Badge variant="outline">{(file.size / 1024).toFixed(1)} KB</Badge>
                  </div>
                ))}
                <Button
                  onClick={processReceipts}
                  disabled={isProcessing}
                  className="w-full mt-4"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Extract Data with AI"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {extractedData && (
          <Card className="border-2 border-[rgb(var(--color-accent))]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Extracted Data</CardTitle>
                  <CardDescription>AI-powered receipt analysis</CardDescription>
                </div>
                <Badge variant="success">{extractedData.confidence}% Confidence</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">Date</p>
                  <p className="text-xl font-bold">{extractedData.date}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">Amount</p>
                  <p className="text-3xl font-bold text-[rgb(var(--color-accent))]">{extractedData.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">Category</p>
                  <p className="text-xl font-bold">{extractedData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">Vendor</p>
                  <p className="text-xl font-bold">{extractedData.vendor}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 rounded-xl border border-[rgb(var(--color-accent))]/30">
                <div>
                  <p className="font-bold text-[rgb(var(--color-accent))]">Tax Deductible</p>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">This expense qualifies as a business deduction</p>
                </div>
                <Badge variant="success">Eligible</Badge>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1">Save to Expenses</Button>
                <Button variant="outline">Edit Data</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </main>
  );
}
