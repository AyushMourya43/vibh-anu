## CRM architecture
- Keep CRM views in a client-safe workspace module and the home route as its public entry; signed-out visitors see an explicitly labeled read-only sample workspace.
- Store department roles separately from auth users; database RPCs enforce all lead mutations, stage transitions and sales redaction so browser controls are not a security boundary.
- Store audio in a private bucket and verify playback elapsed time in the database before allowing an atomic sales claim.