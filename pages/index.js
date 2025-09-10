"use client";

import { VeltRecorderTool, VeltRecorderControlPanel, VeltRecorderPlayer, useRecorderEventCallback } from "@veltdev/react";
import { useEffect, useState } from "react";

function VeltRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recorderId, setRecorderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Event callbacks to track recording state
  const recordingStarted = useRecorderEventCallback("recordingStarted");
  const recordingStopped = useRecorderEventCallback("recordingStopped");
  const recordingDone = useRecorderEventCallback("recordingDone");

  useEffect(() => {
    if (recordingStarted) {
      setIsRecording(true);
    }
  }, [recordingStarted]);

  useEffect(() => {
    if (recordingStopped) {
      setIsRecording(false);
      setIsLoading(true);
    }
  }, [recordingStopped]);

  useEffect(() => {
    if (recordingDone) {
      if (recordingDone.recorderId) {
        setRecorderId(recordingDone.recorderId);
      }
      setIsLoading(false);
    }
  }, [recordingDone]);







  return (
    <div className="recorder-container">
      <div className="toolbar">
        <VeltRecorderTool type="screen" buttonLabel="Start Recording Now" />
        {/* Always show control panel - it will only be visible when recording */}
        <VeltRecorderControlPanel mode="floating" />
      </div>
      
      {/* Video Player Section */}
      <div className="mt-6">
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-medium mb-2">Processing Recording...</h3>
            <div className="flex items-center justify-center p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        )}
        {!isLoading && recorderId && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-medium mb-2">Latest Recording</h3>
            <VeltRecorderPlayer
              key={recorderId}
              recorderId={recorderId}
              summary={false}
            />
          </div>
        )}
      </div>
      
      {/* Recording status indicator */}
      {isRecording && (
        <div className="mt-2 text-sm text-red-600 font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Recording in progress...
        </div>
      )}


    </div>
  );
}

function TestInteractionPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Velt Recording Test - Interaction Testing
        </h1>
        
        {/* Recording Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recording Controls</h2>
          <VeltRecorder />
        </div>

        {/* Test Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Test Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Start Recording Now" to begin screen recording</li>
            <li>Try interacting with all the elements below during recording</li>
            <li>Check if any components become unresponsive or blocked</li>
            <li>Use the "Stop Recording" button to end the recording</li>
            <li>Report any issues where components don't respond during recording</li>
          </ol>
        </div>

        {/* Interactive Test Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Primary Button
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                Success Button
              </button>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Danger Button
              </button>
            </div>
          </div>

          {/* Form Inputs Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Form Inputs</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Text input"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email input"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Textarea"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Dropdowns and Selects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Dropdowns</h3>
            <div className="space-y-3">
              <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Checkbox option 1
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Checkbox option 2
                </label>
              </div>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Interactive Elements</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Range Slider</label>
                <input type="range" min="0" max="100" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">File Upload</label>
                <input type="file" className="w-full" />
              </div>
              <div className="flex space-x-2">
                <label className="flex items-center">
                  <input type="radio" name="radio" className="mr-2" />
                  Radio 1
                </label>
                <label className="flex items-center">
                  <input type="radio" name="radio" className="mr-2" />
                  Radio 2
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Scrollable Content</h3>
          <div className="h-40 overflow-y-auto border border-gray-200 rounded p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="py-2 border-b border-gray-100 last:border-b-0">
                Scrollable item {i + 1} - This content should be scrollable during recording
              </div>
            ))}
          </div>
        </div>

        {/* Modal Trigger */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Modal Test</h3>
          <button 
            onClick={() => alert('Modal/Alert triggered! This should work during recording.')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Trigger Alert/Modal
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <TestInteractionPage />
      </div>
    </div>
  );
}