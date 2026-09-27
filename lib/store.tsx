'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Property, SavedSearch, ScheduledTour } from './types';
import { PROPERTIES } from './data';

interface AppContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  savedProperties: Property[];
  savedSearches: SavedSearch[];
  saveSearch: (title: string, filters: any) => void;
  removeSavedSearch: (id: string) => void;
  scheduledTours: ScheduledTour[];
  bookTour: (tour: Omit<ScheduledTour, 'id' | 'status'>) => void;
  cancelTour: (id: string) => void;
  propertyComments: Record<string, string[]>;
  addComment: (propertyId: string, comment: string) => void;
  removeComment: (propertyId: string, index: number) => void;
  user: { name: string; email: string; loggedIn: boolean } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedSaved = localStorage.getItem('nestora_saved');
        if (storedSaved) return JSON.parse(storedSaved);
      } catch {}
    }
    return ['prop-1', 'prop-4'];
  });

  const [propertyComments, setPropertyComments] = useState<Record<string, string[]>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('nestora_comments');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return {
      'prop-1': ['Great natural light in living room', 'Check HOA restrictions on deck extension'],
      'prop-4': ['Walking distance to light rail', 'Schedule second walkthrough with architect']
    };
  });

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 'search-1',
      title: 'Seattle Single Family > 3 Beds',
      filters: { location: 'Seattle', beds: 3, propertyTypes: ['single-family'] },
      dateCreated: '2026-09-22',
      alertFrequency: 'Daily'
    }
  ]);

  const [scheduledTours, setScheduledTours] = useState<ScheduledTour[]>([
    {
      id: 'tour-1',
      propertyId: 'prop-1',
      propertyTitle: 'Architectural Timber Residence with Sound Views',
      propertyAddress: '742 Evergreen Ridge Way, Seattle, WA',
      tourType: 'In-person',
      date: 'Sat, Oct 3',
      timeSlot: '2:00 PM',
      agentName: 'Elena Vance',
      status: 'Confirmed'
    }
  ]);

  const [user, setUser] = useState<{ name: string; email: string; loggedIn: boolean } | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('nestora_user');
        if (storedUser) return JSON.parse(storedUser);
      } catch {}
    }
    return {
      name: 'Alexandra Miller',
      email: 'alex.miller@example.com',
      loggedIn: true
    };
  });

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nestora_saved', JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('nestora_comments', JSON.stringify(propertyComments));
    } catch {}
  }, [propertyComments]);

  useEffect(() => {
    try {
      localStorage.setItem('nestora_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      const property = PROPERTIES.find((p) => p.id === id);
      const title = property ? property.address : 'Property';
      showToast(exists ? `Removed ${title} from saved` : `Saved ${title} to your collection`);
      return next;
    });
  };

  const addComment = (propertyId: string, comment: string) => {
    if (!comment.trim()) return;
    setPropertyComments((prev) => {
      const current = prev[propertyId] || [];
      return {
        ...prev,
        [propertyId]: [...current, comment.trim()]
      };
    });
    showToast('Note added to property');
  };

  const removeComment = (propertyId: string, index: number) => {
    setPropertyComments((prev) => {
      const current = prev[propertyId] || [];
      const updated = current.filter((_, i) => i !== index);
      return {
        ...prev,
        [propertyId]: updated
      };
    });
    showToast('Note removed');
  };

  const savedProperties = PROPERTIES.filter((p) => savedIds.includes(p.id));

  const saveSearch = (title: string, filters: any) => {
    const newSearch: SavedSearch = {
      id: `search-${Date.now()}`,
      title,
      filters,
      dateCreated: new Date().toISOString().split('T')[0],
      alertFrequency: 'Instant'
    };
    setSavedSearches((prev) => [newSearch, ...prev]);
    showToast(`Saved search: "${title}"`);
  };

  const removeSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
    showToast('Saved search removed');
  };

  const bookTour = (tourData: Omit<ScheduledTour, 'id' | 'status'>) => {
    const newTour: ScheduledTour = {
      ...tourData,
      id: `tour-${Date.now()}`,
      status: 'Confirmed'
    };
    setScheduledTours((prev) => [newTour, ...prev]);
    showToast(`Tour requested for ${tourData.date} at ${tourData.timeSlot}`);
  };

  const cancelTour = (id: string) => {
    setScheduledTours((prev) => prev.filter((t) => t.id !== id));
    showToast('Scheduled tour cancelled');
  };

  const login = (name: string, email: string) => {
    setUser({ name, email, loggedIn: true });
    showToast(`Welcome back, ${name}`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out');
  };

  return (
    <AppContext.Provider
      value={{
        savedIds,
        isSaved,
        toggleSave,
        savedProperties,
        savedSearches,
        saveSearch,
        removeSavedSearch,
        scheduledTours,
        bookTour,
        cancelTour,
        propertyComments,
        addComment,
        removeComment,
        user,
        login,
        logout,
        toast,
        showToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-lg shadow-lg border border-slate-800 flex items-center gap-2 max-w-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
