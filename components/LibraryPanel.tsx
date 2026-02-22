import React, { useState } from 'react';
import { Scissors, Move, Circle, Square, ArrowRight, Type, Box, Zap, Droplet, Ruler, Star, Triangle } from 'lucide-react';

export interface LibraryItem {
    id: string;
    type: 'tool' | 'shape' | 'text';
    name: string;
    icon: string;
    category: string;
}

const TOOLS: LibraryItem[] = [
    { id: 'scissors', type: 'tool', name: 'مقص', icon: '✂️', category: 'أدوات' },
    { id: 'needle', type: 'tool', name: 'إبرة', icon: '🪡', category: 'أدوات' },
    { id: 'ruler', type: 'tool', name: 'مسطرة', icon: '📏', category: 'أدوات' },
    { id: 'hammer', type: 'tool', name: 'مطرقة', icon: '🔨', category: 'أدوات' },
    { id: 'power', type: 'tool', name: 'كهرباء', icon: '⚡', category: 'أدوات' },
    { id: 'water', type: 'tool', name: 'ماء', icon: '💧', category: 'أدوات' },
];

const SHAPES: LibraryItem[] = [
    { id: 'rect', type: 'shape', name: 'مربع', icon: '⬜', category: 'أشكال' },
    { id: 'circle', type: 'shape', name: 'دائرة', icon: '⭕', category: 'أشكال' },
    { id: 'triangle', type: 'shape', name: 'مثلث', icon: '🔺', category: 'أشكال' },
    { id: 'arrow', type: 'shape', name: 'سهم', icon: '➡️', category: 'أشكال' },
    { id: 'star', type: 'shape', name: 'نجمة', icon: '⭐', category: 'أشكال' },
];

interface LibraryPanelProps {
    onDragStart: (item: LibraryItem) => void;
}

export default function LibraryPanel({ onDragStart }: LibraryPanelProps) {
    const [activeTab, setActiveTab] = useState<'tools' | 'shapes' | 'text'>('tools');

    const handleDragStart = (e: React.DragEvent, item: LibraryItem) => {
        e.dataTransfer.setData('libraryItem', JSON.stringify(item));
        onDragStart(item);
    };

    return (
        <div className="fixed right-4 top-32 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Box className="w-5 h-5" />
                    مكتبة الأدوات
                </h3>
                <p className="text-xs text-indigo-100 mt-1">اسحب العناصر للكانفا</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('tools')}
                    className={`flex-1 py-3 text-sm font-bold transition-all ${activeTab === 'tools'
                            ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                >
                    🛠️ أدوات
                </button>
                <button
                    onClick={() => setActiveTab('shapes')}
                    className={`flex-1 py-3 text-sm font-bold transition-all ${activeTab === 'shapes'
                            ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                >
                    📐 جرافيك
                </button>
                <button
                    onClick={() => setActiveTab('text')}
                    className={`flex-1 py-3 text-sm font-bold transition-all ${activeTab === 'text'
                            ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-600'
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                >
                    📝 نص
                </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                {activeTab === 'tools' && (
                    <div className="grid grid-cols-2 gap-3">
                        {TOOLS.map(tool => (
                            <div
                                key={tool.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, tool)}
                                className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border-2 border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-move group"
                            >
                                <span className="text-3xl group-hover:scale-125 transition-transform">{tool.icon}</span>
                                <span className="text-xs font-bold text-slate-700">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'shapes' && (
                    <div className="grid grid-cols-2 gap-3">
                        {SHAPES.map(shape => (
                            <div
                                key={shape.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, shape)}
                                className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-move group"
                            >
                                <span className="text-3xl group-hover:scale-125 transition-transform">{shape.icon}</span>
                                <span className="text-xs font-bold text-emerald-700">{shape.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'text' && (
                    <div className="space-y-3">
                        <button
                            draggable
                            onDragStart={(e) => handleDragStart(e, { id: 'label', type: 'text', name: 'تسمية', icon: '📝', category: 'نص' })}
                            className="w-full p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-move"
                        >
                            <Type className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                            <span className="text-sm font-bold text-amber-700">إضافة تسمية</span>
                        </button>
                        <button
                            draggable
                            onDragStart={(e) => handleDragStart(e, { id: 'title', type: 'text', name: 'عنوان', icon: '📌', category: 'نص' })}
                            className="w-full p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-move"
                        >
                            <div className="text-lg font-bold mx-auto mb-1 text-amber-600">Aa</div>
                            <span className="text-sm font-bold text-amber-700">عنوان كبير</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
