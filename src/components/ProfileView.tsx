import React, { useState } from 'react';
import { 
  UserCheck, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Heart, 
  Clock, 
  Edit3, 
  ArrowRight, 
  Check, 
  Building2, 
  Compass, 
  Sparkles,
  Save,
  X
} from 'lucide-react';
import { UserProfile, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface ProfileViewProps {
  profile: UserProfile;
  currentLang: LanguageCode;
  onUpdateProfile: (updated: UserProfile) => void;
  onProceedToSkillGap: () => void;
  onProceedToRecommendations: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  currentLang,
  onUpdateProfile,
  onProceedToSkillGap,
  onProceedToRecommendations
}) => {
  const t = (key: string) => UI_TRANSLATIONS[key]?.[currentLang] || UI_TRANSLATIONS[key]?.['en'] || key;
  const isRtl = currentLang === 'ur';

  // Inline editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>({ ...profile });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-8 py-4 px-4 sm:px-6 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PM-AJAY GIA Candidate Profile Card</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('yourProfileTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Dynamically synthesized from your responses. Validated for NSQF skill gap matching and local opportunity clustering.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="edit-profile-trigger-btn"
            onClick={() => {
              setEditForm({ ...profile });
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('editProfile')}</span>
          </button>

          <button
            id="proceed-skillgap-top-btn"
            onClick={onProceedToSkillGap}
            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>Analyze Skill Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Edit Profile Modal / Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {t('editProfile')}
                </h3>
                <p className="text-xs text-slate-500">
                  Update any field to immediately recalculate NSQF pathway recommendations.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="text"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location (Town/Village, District, State)</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => {
                      const loc = e.target.value;
                      const parts = loc.split(',');
                      setEditForm({
                        ...editForm,
                        location: loc,
                        district: parts[0]?.trim() || editForm.district,
                        state: parts[1]?.trim() || editForm.state
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Highest Education Level</label>
                  <input
                    type="text"
                    value={editForm.education}
                    onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Occupation</label>
                  <input
                    type="text"
                    value={editForm.currentOccupation}
                    onChange={(e) => setEditForm({ ...editForm, currentOccupation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Family / Traditional Occupation</label>
                  <input
                    type="text"
                    value={editForm.familyOccupation}
                    onChange={(e) => setEditForm({ ...editForm, familyOccupation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Existing Skills (comma separated)</label>
                <input
                  type="text"
                  value={editForm.skills.join(', ')}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Experience</label>
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Employment Type</label>
                  <select
                    value={editForm.employmentPreference}
                    onChange={(e) => setEditForm({ ...editForm, employmentPreference: e.target.value as UserProfile['employmentPreference'] })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium bg-white"
                  >
                    <option value="Self-employment">Self-employment</option>
                    <option value="Employment">Employment</option>
                    <option value="Either">Either</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Interests / Aspirations (comma separated)</label>
                <input
                  type="text"
                  value={editForm.interests.join(', ')}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    interests: e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Type of Work</label>
                  <select
                    value={editForm.preferredWorkType}
                    onChange={(e) => setEditForm({ ...editForm, preferredWorkType: e.target.value as UserProfile['preferredWorkType'] })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium bg-white"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Agriculture/allied">Agriculture/allied</option>
                    <option value="Digital">Digital</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobility Constraints</label>
                  <select
                    value={editForm.mobilityConstraints}
                    onChange={(e) => setEditForm({ ...editForm, mobilityConstraints: e.target.value as UserProfile['mobilityConstraints'] })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium bg-white"
                  >
                    <option value="Within district">Within district</option>
                    <option value="Within village/block">Within village/block</option>
                    <option value="Statewide">Statewide</option>
                    <option value="Anywhere in India">Anywhere in India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Local Context & Economic Opportunities</label>
                <textarea
                  rows={2}
                  value={editForm.localContext}
                  onChange={(e) => setEditForm({ ...editForm, localContext: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t('saveChanges')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Profile Grid Display (All actual user fields) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Basic Demographics & Education */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center font-black text-amber-800 text-lg">
              {profile.name.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                {profile.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {profile.age ? `${profile.age} Years Old` : 'Age Unspecified'}
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Location & District</span>
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Highest Education</span>
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <GraduationCap className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{profile.education}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Mobility Range</span>
              <div className="text-slate-800 font-semibold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 inline-block">
                {profile.mobilityConstraints}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Occupation & Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-700" />
            <span>Livelihood & Existing Competencies</span>
          </h4>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Current Occupation</span>
              <p className="text-slate-900 font-bold text-sm">
                {profile.currentOccupation}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Family / Traditional Occupation</span>
              <p className="text-slate-800 font-semibold">
                {profile.familyOccupation}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Work Experience</span>
              <div className="flex items-center gap-1 text-slate-800 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.experience}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Existing Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {(profile.skills || []).map((sk, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-xs font-semibold"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{sk}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Aspirations & Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-700" />
            <span>Aspirations & Livelihood Preferences</span>
          </h4>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Interests / Aspirations</span>
              <div className="flex flex-wrap gap-1.5">
                {(profile.interests || []).map((it, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md text-xs font-semibold"
                  >
                    <span>{it}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Employment Preference</span>
              <span className="inline-block bg-slate-900 text-amber-300 font-bold px-2.5 py-1 rounded-lg text-xs">
                {profile.employmentPreference}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Preferred Work Type</span>
              <span className="inline-block bg-blue-50 text-blue-900 border border-blue-200 font-bold px-2.5 py-1 rounded-lg text-xs">
                {profile.preferredWorkType}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Local Economic Context</span>
              <p className="text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px] leading-relaxed">
                "{profile.localContext}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer to Proceed */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
        <div className="text-xs text-amber-900">
          <strong>Profile ready for deterministic AI engine.</strong> Next, view your exact competency gaps and top 3 NSQF pathways.
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onProceedToSkillGap}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Proceed to Skill Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onProceedToRecommendations}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>View Top 3 Pathways</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
