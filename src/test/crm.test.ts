import { describe, expect, it } from 'vitest';
import { canAdvance, canClaim, redactSalesLead, sampleLeads } from '@/lib/crm';
function sample(index:number) { const lead=sampleLeads[index]; if(!lead) throw new Error('Missing test lead'); return lead; }
describe('CRM workflow rules', () => {
  it('Communication can only move its own queue', () => { expect(canAdvance('communication', sample(0))).toBe(true); expect(canAdvance('communication', sample(1))).toBe(false); });
  it('Vigilance can only move its own queue', () => { expect(canAdvance('vigilance', sample(1))).toBe(true); expect(canAdvance('vigilance', sample(2))).toBe(false); });
  it('Support can only allocate its own queue', () => { expect(canAdvance('support', sample(2))).toBe(true); expect(canAdvance('support', sample(1))).toBe(false); });
  it('Sales claim requires complete playback', () => { expect(canClaim('sales', sample(3), false)).toBe(false); expect(canClaim('sales', sample(3), true)).toBe(true); });
  it('Only Sales can claim a lead', () => { expect(canClaim('support', sample(3), true)).toBe(false); });
  it('Sales cannot see full information until claiming', () => { const hidden=redactSalesLead(sample(3), 'sales-user'); expect(hidden.contact).toBeNull(); expect(hidden.name).toBe('Protected lead'); expect(hidden.address).toBeNull(); });
  it('Claimed lead information is visible to the claimant', () => { const lead={...sample(3),claimed_by:'sales-user'}; expect(redactSalesLead(lead,'sales-user').contact).toBe('98456 78901'); expect(redactSalesLead(lead,'another-user').contact).toBeNull(); });
});