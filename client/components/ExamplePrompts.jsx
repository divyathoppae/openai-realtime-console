import { useState } from 'react';
import { examplePrompts } from '../examples/functionCallingExamples.js';

export default function ExamplePrompts({ sendTextMessage, isSessionActive }) {
  const [selectedCategory, setSelectedCategory] = useState('colorPalette');
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePromptClick = (prompt) => {
    if (isSessionActive) {
      sendTextMessage(prompt);
    }
  };

  const categories = [
    { key: 'colorPalette', label: '🎨 Color Palettes', icon: '🎨' },
    { key: 'weather', label: '🌤️ Weather', icon: '🌤️' },
    { key: 'calculation', label: '🧮 Calculator', icon: '🧮' },
    { key: 'todo', label: '📝 Todo Items', icon: '📝' },
    { key: 'qrCode', label: '📱 QR Codes', icon: '📱' },
    { key: 'combined', label: '🔗 Combined', icon: '🔗' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div 
        className="p-3 border-b border-gray-200 cursor-pointer flex items-center justify-between hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold text-sm">💡 Example Prompts</h3>
        <span className="text-gray-500 text-xs">
          {isExpanded ? '▼' : '▶'} {isSessionActive ? 'Click to try' : 'Start session first'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="p-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
              </button>
            ))}
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {examplePrompts[selectedCategory]?.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                disabled={!isSessionActive}
                className={`w-full text-left text-xs p-2 rounded border transition-colors ${
                  isSessionActive
                    ? 'hover:bg-blue-50 hover:border-blue-200 cursor-pointer text-gray-700'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                } border-gray-200`}
              >
                "{prompt}"
              </button>
            ))}
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              {isSessionActive 
                ? 'Click any example above to try it out!' 
                : 'Start a session first, then click examples to try them.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
