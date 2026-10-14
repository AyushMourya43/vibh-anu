import { createFileRoute } from "@tanstack/react-router";
import { CrmWorkspace } from '@/components/crm-workspace';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Vibh-Anu CRM | Connected lead workspace' },
    { name: 'description', content: 'Manage leads across Marketing, Communication, Vigilance, Support and Sales with secure department access and verified handoffs.' },
    { property: 'og:title', content: 'Vibh-Anu CRM | Connected lead workspace' },
    { property: 'og:description', content: 'Five connected departments. One secure lead workflow from capture to claim.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  return <CrmWorkspace />;
}
