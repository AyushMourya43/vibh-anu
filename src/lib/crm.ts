export const departments = ['marketing', 'communication', 'vigilance', 'support', 'sales'] as const;
export type Department = typeof departments[number];
export const departmentNames: Record<Department, string> = { marketing: 'Marketing', communication: 'Communication', vigilance: 'Vigilance', support: 'Support', sales: 'Sales' };
export interface Lead {
  id: string; reference: number; name: string; contact: string | null; address: string | null;
  meeting_date: string | null; meeting_time: string | null; remark: string | null; stage: Department;
  audio_path: string | null; audio_duration: number | null; claimed_by: string | null;
  created_at: string; updated_at: string;
}
export interface LeadEvent { id: string; lead_id: string; department: Department; action: string; created_at: string }
export function canAdvance(role: Department, lead: Lead) { return role === lead.stage && ['communication', 'vigilance', 'support'].includes(role) && !lead.claimed_by; }
export function canClaim(role: Department, lead: Lead, complete: boolean) { return role === 'sales' && lead.stage === 'sales' && !lead.claimed_by && complete; }
export function redactSalesLead(lead: Lead, userId: string): Lead { return lead.claimed_by === userId ? lead : { ...lead, name: 'Protected lead', contact: null, address: null, meeting_date: null, meeting_time: null, remark: null }; }
export const sampleLeads: Lead[] = [
  ['Aarav Sharma','98765 43210','communication','2026-10-16','10:30','AS'],
  ['Priya Patel','98234 56789','vigilance','2026-10-15','14:00','PP'],
  ['Rohan Mehta','98901 23456','support','2026-10-16','11:00','RM'],
  ['Sneha Reddy','98456 78901','sales','2026-10-17','15:30','SR'],
  ['Vikram Singh','98123 45678','communication','2026-10-15','12:00','VS'],
  ['Ananya Iyer','98789 01234','vigilance','2026-10-18','10:00','AI'],
  ['Aditya Kapoor','98678 90123','communication',null,null,'AK'],
  ['Neha Gupta','98567 89012','support','2026-10-19','16:00','NG'],
].map((v,i) => ({ id: `sample-${i}`, reference: 1048-i, name: String(v[0]), contact: v[1] ?? null, stage: v[2] as Department, meeting_date: v[3] ?? null, meeting_time: v[4] ?? null, address: 'Sample address · New Delhi, India', remark: 'Interested in discussing available services.', audio_path: null, audio_duration: null, claimed_by: null, created_at: '2026-10-14T08:00:00Z', updated_at: '2026-10-14T08:00:00Z' }));