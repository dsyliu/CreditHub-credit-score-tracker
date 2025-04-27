import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PreferenceOption {
  id: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-preferences-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss']
})
export class PreferencesPopupComponent {
  @Output() close = new EventEmitter<void>();
  
  preferences: PreferenceOption[] = [
    { id: 'new-to-credit', label: "I'm new to credit", selected: false },
    { id: 'big-purchase', label: "I have a big purchase coming up", selected: false },
    { id: 'retirement', label: "I want to set up retirement plan", selected: false },
    { id: 'pay-debts', label: "I want to pay off debts", selected: false },
    { id: 'learn-finance', label: "I want to learn more about my financial situation", selected: false }
  ];

  constructor() {
    // Load saved preferences from session storage
    const savedPreferences = sessionStorage.getItem('creditPreferences');
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      this.preferences = this.preferences.map(pref => ({
        ...pref,
        selected: parsedPreferences.includes(pref.id)
      }));
    }
  }

  togglePreference(preference: PreferenceOption) {
    preference.selected = !preference.selected;
  }

  savePreferences() {
    const selectedPreferences = this.preferences
      .filter(pref => pref.selected)
      .map(pref => pref.id);
    
    sessionStorage.setItem('creditPreferences', JSON.stringify(selectedPreferences));
    this.close.emit();
  }

  clearPreferences() {
    sessionStorage.removeItem('creditPreferences');
    this.preferences = this.preferences.map(pref => ({
      ...pref,
      selected: false
    }));
  }

  closePopup() {
    this.close.emit();
  }
}
