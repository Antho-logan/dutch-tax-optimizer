"use client";

import { useState, useCallback } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";
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
    <>
      <ScrollEffects />

      {/* Animated Backgrounds */}
      <div className="hero-gradient parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField count={25} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300 max-w-5xl">
        {/* Page Header */}
        <div className="mb-8 reveal" data-reveal>
          <div className="flex items-center gap-3 mb-2">
            <span className="eyebrow">AI-Powered</span>
            <span className="text-sm text-[rgb(var(--color-text-muted))]">2s processing time</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Receipt Scanner</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))]">
            Upload receipts and let AI extract vendor, amount, category, and date automatically.
          </p>
        </div>

        {/* Upload Card */}
        <div className="glass-panel mb-8 reveal" data-reveal>
          <h2 className="text-2xl font-bold mb-6">Upload Receipts</h2>
          <p className="text-[rgb(var(--color-text-muted))] mb-6">
            Drag and drop receipt images or click to browse. Our AI extracts everything in seconds.
          </p>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300
              ${dragActive
                ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5"
                : "border-[rgb(var(--color-line))] hover:border-[rgb(var(--color-primary))]/50"}
            `}
          >
            <div className="text-6xl mb-6">📸</div>
            <p className="text-xl font-semibold mb-2">Drop your receipts here</p>
            <p className="text-[rgb(var(--color-text-muted))] mb-6">JPG, PNG, WEBP supported</p>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} />
              <button className="btn-ghost">Browse Files</button>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-3 reveal" data-reveal>
              <h3 className="font-bold">Uploaded Files ({files.length})</h3>
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[rgb(var(--bg-soft))] rounded-xl">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
              <button
                onClick={processReceipts}
                disabled={isProcessing}
                className="btn-primary w-full mt-4"
              >
                {isProcessing ? "Processing..." : "Extract Data with AI"}
              </button>
            </div>
          )}
        </div>

        {/* Results Card */}
        {extractedData && (
          <div className="card reveal" data-reveal style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Extracted Data</h3>
                <p className="text-[rgb(var(--color-text-muted))]">AI-powered receipt analysis</p>
              </div>
              <span className="text-xs font-semibold px-4 py-2 rounded-full bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]">
                {extractedData.confidence}% Confidence
              </span>
            </div>

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

            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 rounded-xl border border-[rgb(var(--color-accent))]/30 mb-6">
              <div>
                <p className="font-bold text-[rgb(var(--color-accent))]">Tax Deductible</p>
                <p className="text-sm text-[rgb(var(--color-text-muted))]">This expense qualifies as a business deduction</p>
              </div>
              <span className="text-xs font-semibold px-4 py-2 rounded-full bg-[rgb(var(--color-accent))] text-white">
                Eligible
              </span>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary flex-1">Save to Expenses</button>
              <button className="btn-ghost">Edit Data</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
