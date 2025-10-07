# LiMe App Routing Architecture

## Overview

The lime-app uses a hybrid routing system combining server-side CGI redirects with client-side SPA routing via preact-router.

## Architecture Components

### 1. Base Path Configuration

**File:** `src/template.html`
```html
<base href="/app/">
```

This tells the browser that all relative URLs should be resolved relative to `/app/`.

### 2. Server-Side CGI Router

**File:** `files/www/cgi-bin/lime-app-spa`

**Purpose:** Handle direct URL navigation and serve the SPA for all lime-app routes.

**Configuration in uhttpd:**
```
uhttpd.main.error_page='/cgi-bin/lime-app-spa'
```

**Logic:**

1. **Known routes without `/app/` prefix** → 301 redirect to `/app/{route}`
   - Example: `/notes` → `/app/notes`

2. **Routes starting with `/app/`** → Serve `index.html` or return 404 for static files
   - `/app/notes` → serves `/www/app/index.html`
   - `/app/bundle.js` → returns 404 (let uhttpd serve static file)

3. **Unknown routes** → 404 Not Found
   - `/invalid` → 404

### 3. Client-Side Routing (preact-router)

**File:** `src/components/app.tsx`

**Important:** With `<base href="/app/">`, preact-router automatically strips the `/app/` prefix from URLs before matching routes.

**URL Processing:**
- Browser URL: `http://router/app/notes`
- preact-router sees: `notes` (without `/app/` and without leading `/`)
- Routes must be defined: `notes` (NOT `/notes` or `/app/notes`)

**Route Definitions:**

```typescript
// ✅ CORRECT - routes without leading /
<Route path="notes">...</Route>
<Route path="metrics">...</Route>
<Route path="nodeadmin/hostname">...</Route>

// ❌ WRONG - routes with leading /
<Route path="/notes">...</Route>  // Will never match!
<Route path="/metrics">...</Route>  // Will never match!
```

## Complete Flow Example

### User navigates to: `http://router/notes`

1. **uhttpd:** No file at `/notes` → executes CGI `/cgi-bin/lime-app-spa`

2. **CGI script:**
   ```bash
   REQUEST_URI="/notes"
   # Matches: /notes in known routes
   # Returns: 301 redirect to /app/notes
   ```

3. **Browser:** Follows redirect to `http://router/app/notes`

4. **uhttpd:** No file at `/app/notes` → executes CGI `/cgi-bin/lime-app-spa`

5. **CGI script:**
   ```bash
   REQUEST_URI="/app/notes"
   # Matches: /app/* pattern
   # Returns: content of /www/app/index.html
   ```

6. **Browser:**
   - Loads HTML with `<base href="/app/">`
   - Loads and executes bundle.js
   - Current URL: `/app/notes`

7. **preact-router:**
   - Reads URL: `/app/notes`
   - Strips base: `notes`
   - Searches for route matching `notes`
   - ✅ Finds `<Route path="notes">` and renders Notes component

### User navigates to: `http://router/nodeadmin/hostname`

1-3. **Redirect:** `/nodeadmin/hostname` → `/app/nodeadmin/hostname`

4-6. **Load SPA:** Serves index.html with bundle

7. **preact-router:**
   - URL after base: `nodeadmin/hostname`
   - ✅ Finds `<Route path="nodeadmin/hostname">` and renders HostnamePage

## Plugin Route Registration

### Main Routes

**Pattern:** Plugin name → route path

```typescript
// Plugin definition
export default {
    name: "Notes",  // Becomes route: "notes"
    page: NotesPage,
    ...
}
```

Automatically registered as:
```typescript
<Route path="notes">
    <NotesPage />
</Route>
```

### Additional Routes

**Public routes:**
```typescript
export default {
    name: "Align",
    additionalRoutes: [
        ["align-single/:iface/:mac", AlignSingle]  // ✅ No leading /
    ]
}
```

**Protected routes:**
```typescript
export default {
    name: "NodeAdmin",
    additionalProtectedRoutes: [
        ["nodeadmin/hostname", HostnamePage],  // ✅ No leading /
        ["nodeadmin/wifipassword", APPasswordPage],
        ...
    ]
}
```

## Common Mistakes

### ❌ Adding leading slash to routes
```typescript
// WRONG
<Route path="/notes">  // Won't match with <base href="/app/">
additionalRoutes: [["/align-single/:iface/:mac", ...]]
```

### ❌ Including /app/ in route paths
```typescript
// WRONG
<Route path="/app/notes">  // base is already /app/
```

### ❌ Forgetting to update CGI script when adding new routes
```bash
# CGI script must know about all routes for redirect
case "$REQUEST_URI" in
    /rx|/notes|/metrics|/newroute)  # Add here!
        ...
```

## Testing Routes

### 1. Test CGI Redirect

```bash
ssh root@router "REQUEST_URI=/notes /www/cgi-bin/lime-app-spa 2>&1 | grep Location"
# Expected: Location: /app/notes
```

### 2. Test CGI Serves HTML

```bash
ssh root@router "REQUEST_URI=/app/notes /www/cgi-bin/lime-app-spa 2>&1 | head -3"
# Expected: <!DOCTYPE html>...
```

### 3. Test in Browser

Open browser developer console and check:
```javascript
window.location.pathname  // Should be /app/notes
document.querySelector('base').href  // Should be http://router/app/
```

## Maintenance Checklist

When adding a new plugin route:

- [ ] Add plugin to `src/config.ts`
- [ ] Ensure route is lowercase in plugin definition
- [ ] Do NOT add leading `/` to route paths
- [ ] Update CGI script (`files/www/cgi-bin/lime-app-spa`) with new route
- [ ] Test direct URL navigation
- [ ] Test sub-routes if any
- [ ] Verify redirect works (`/route` → `/app/route`)
- [ ] Verify SPA navigation works (clicking links)

## Reference Commits

- `b4c3302` - Working routing implementation
- `0b2bb22` - Base href configuration
- `c9f68b8` - CGI SPA route redirects
