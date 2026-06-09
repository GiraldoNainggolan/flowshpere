"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, Circle, Trash2, Plus, 
  Loader2, AlertCircle, Clock, Flag, X
} from "lucide-react";
import { createClient } from "../../../src/lib/supabase/client"; 
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}

export default function TasksPage() {
  const supabase = createClient();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Modal Create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  // 1. READ: Ambil Data Tugas
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) toast.error(`Gagal memuat tugas: ${error.message}`);
        else if (data) setTasks(data as Task[]);
      }
      setIsLoading(false);
    };

    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setTasks(data as Task[]);
    }
  };

  // 2. CREATE: Buat Tugas Baru
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return toast.error("Nama tugas tidak boleh kosong!");

    setIsCreating(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setIsCreating(false);
      return toast.error("Sesi tidak valid, harap login ulang.");
    }

    const { error } = await supabase.from('tasks').insert([
      { 
        title: newTaskTitle.trim(), 
        priority: newPriority,
        status: 'To Do',
        user_id: user.id 
      }
    ]);

    if (error) {
      toast.error(`Gagal menyimpan: ${error.message}`);
    } else {
      toast.success("Tugas berhasil ditambahkan!");
      setNewTaskTitle("");
      setNewPriority("Medium");
      setIsModalOpen(false);
      await refreshTasks();
    }
    setIsCreating(false);
  };

  // 3. UPDATE: Centang Tugas Selesai/Belum
  const toggleTaskStatus = async (task: Task) => {
    // UI Update Instan (Optimistic UI)
    const newStatus = task.status === 'Done' ? 'To Do' : 'Done';
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

    // Update ke Supabase di belakang layar
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', task.id);

    if (error) {
      toast.error("Gagal memperbarui status tugas.");
      await refreshTasks(); // Kembalikan ke state semula jika gagal
    } else {
      if (newStatus === 'Done') toast.success("Tugas diselesaikan! 🎉");
    }
  };

  // 4. DELETE: Hapus Tugas
  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm("Yakin ingin menghapus tugas ini?")) return;

    setTasks(tasks.filter(t => t.id !== taskId)); // UI Update Instan

    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      toast.error("Gagal menghapus tugas.");
      await refreshTasks();
    } else {
      toast.success("Tugas dihapus.");
    }
  };

  // Fungsi Pembantu Warna Prioritas
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
      case 'Medium': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-500 relative">
      
      {/* --- MODAL TAMBAH TUGAS --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-black/5">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Tugas Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Tugas</label>
                  <input 
                    type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Apa yang harus diselesaikan hari ini?" required autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tingkat Prioritas</label>
                  <div className="flex gap-3">
                    {['Low', 'Medium', 'High'].map((level) => (
                      <button
                        key={level} type="button"
                        onClick={() => setNewPriority(level)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${
                          newPriority === level 
                            ? getPriorityColor(level) + ' ring-2 ring-brand-500/30'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Batal</button>
                <button type="submit" disabled={isCreating} className="px-6 py-2.5 rounded-xl font-medium text-white bg-brand-500 hover:bg-brand-600 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center gap-2">
                  {isCreating ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl text-gray-900 dark:text-white font-bold tracking-tight mb-2 transition-colors">Tugas Saya</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">Kelola daftar pekerjaan pribadi Anda secara mandiri.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-gray-900 dark:bg-brand-500 hover:bg-gray-800 dark:hover:bg-brand-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98] shadow-md"
        >
          <Plus size={18} /> Tugas Baru
        </button>
      </div>

      {/* --- LIST TUGAS --- */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
        
        {/* State Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
            <Loader2 size={40} className="animate-spin text-brand-500 mb-4" />
            <p className="font-medium">Memuat tugas...</p>
          </div>
        ) : tasks.length === 0 ? (
          
          /* State Kosong */
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum ada tugas</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">Anda telah menyelesaikan semua pekerjaan. Bersantailah, atau tambahkan tugas baru untuk memulai sprint.</p>
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl font-bold hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors">
              Buat Tugas Pertama
            </button>
          </div>

        ) : (
          
          /* Render Data CRUD Supabase */
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`group flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  task.status === 'Done' ? 'opacity-60 bg-gray-50/50 dark:bg-gray-900/50' : ''
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  
                  {/* Tombol Centang */}
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    className={`mt-0.5 sm:mt-0 shrink-0 transition-colors ${
                      task.status === 'Done' ? 'text-brand-500' : 'text-gray-300 dark:text-gray-600 hover:text-brand-500 dark:hover:text-brand-400'
                    }`}
                  >
                    {task.status === 'Done' ? <CheckCircle2 size={24} className="fill-brand-50 dark:fill-brand-900/30" /> : <Circle size={24} />}
                  </button>
                  
                  {/* Info Tugas */}
                  <div>
                    <h4 className={`text-base font-semibold mb-1 transition-all ${
                      task.status === 'Done' 
                        ? 'text-gray-400 dark:text-gray-500 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 sm:mt-0">
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol Hapus (Tersembunyi, muncul saat Hover) */}
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 ml-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg opacity-0 sm:group-hover:opacity-100 transition-all focus:opacity-100 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}