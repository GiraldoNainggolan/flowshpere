"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FolderKanban, Plus, ArrowRight, Loader2, Trash2, X } from "lucide-react";
import { createClient } from "../../src/lib/supabase/client"; 
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function ProjectsPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE UNTUK MODAL UI/UX ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    const fetchProjectsData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          toast.error(`Error Supabase: ${error.message}`);
          console.error(error);
        } else if (data) {
          setProjects(data as Project[]);
        }
      }
      setIsLoading(false); 
    };

    fetchProjectsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return toast.error("Judul proyek wajib diisi!");

    setIsCreating(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsCreating(false);
      return toast.error("Sesi tidak ditemukan. Harap login kembali.");
    }

    const { data, error } = await supabase.from('projects').insert([
      { 
        title: newTitle.trim(), 
        description: newDesc.trim() || 'Tidak ada deskripsi', 
        status: 'Aktif',
        user_id: user.id 
      }
    ]).select(); 

    if (error) {
      toast.error(`Gagal Simpan: ${error.message}`);
      console.error("Supabase Insert Error:", error);
    } else if (data) {
      toast.success("Proyek berhasil dibuat!");
      setProjects([data[0] as Project, ...projects]);
      
      setNewTitle("");
      setNewDesc("");
      setIsModalOpen(false);
    }
    
    setIsCreating(false);
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault(); 
    if (!window.confirm("Yakin ingin menghapus proyek ini permanen?")) return;

    const { error } = await supabase.from('projects').delete().eq('id', projectId);
    if (error) {
      toast.error(`Gagal Hapus: ${error.message}`);
    } else {
      toast.success("Proyek dihapus.");
      setProjects(projects.filter(p => p.id !== projectId)); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500 relative">
      
      {/* --- MODAL UI/UX DENGAN Z-INDEX MAKSIMAL (z-100) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden ring-1 ring-black/5">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Buat Proyek Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Proyek</label>
                  <input 
                    type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Maks. 50 karakter..." required autoFocus
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Deskripsi Singkat</label>
                  <textarea 
                    rows={3} value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Apa tujuan utama dari proyek ini?" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none transition-colors"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={isCreating} className="px-6 py-2.5 rounded-xl font-medium text-white bg-brand-500 hover:bg-brand-600 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center gap-2">
                  {isCreating ? <Loader2 size={18} className="animate-spin" /> : <FolderKanban size={18} />}
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- KONTEN UTAMA --- */}
      <div className="mb-8">
        <h1 className="text-4xl text-gray-900 dark:text-white font-bold tracking-tight mb-2 transition-colors">Semua Proyek</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">Kelola dan lacak inisiatif terkini tim Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-500" size={40} />
          </div>
        ) : (
          <>
            {projects.map((project) => (
              <Link 
                key={project.id} href={`/dashboard/projects/${project.id}`} 
                className="group flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-lg dark:shadow-none transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <button onClick={(e) => handleDeleteProject(e, project.id)} className="absolute top-4 right-4 p-2 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all z-10">
                  <Trash2 size={16} />
                </button>

                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl transition-colors">
                    <FolderKanban size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${project.status === 'Aktif' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-3 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 transition-colors leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold relative z-10 shadow-sm transition-colors">ME</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                    Lihat Papan <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}

            {/* Tombol dengan min-h-70 */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 hover:bg-brand-50 dark:hover:bg-brand-500/5 hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 cursor-pointer min-h-70"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:scale-110 transition-all shadow-sm">
                <Plus size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-1">
                Buat Proyek Baru
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors">
                Siapkan papan kanban kosong.
              </p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}