# LimeApp v4 Migration Guide

## Overview

This document outlines the breaking changes and migration path from LimeApp v3 to v4 foundation. The v4 migration introduces modernized query management, enhanced error handling, and significant performance optimizations.

## ⚠️ Breaking Changes

### 1. TanStack Query Migration (v3 → v4.6.0)

#### Query Hook Signatures
**Before (v3):**
```javascript
// Legacy function syntax
const mutation = useMutation(mutationFn, options)
```

**After (v4):**
```javascript
// New object syntax (required)
const mutation = useMutation({ 
  mutationFn, 
  ...options 
})
```

**Impact:** All `useMutation` calls must migrate to object syntax. Direct function calls will cause TypeScript errors.

#### Query Key Management
**Before (v3):**
```javascript
// Hardcoded query keys scattered across components
useQuery(['lime-metrics', 'get_metrics'], fetchMetrics)
useQuery(['pirania', 'get_portal_config'], fetchPortalConfig)
```

**After (v4):**
```javascript
// Centralized query keys (required)
import { queryKeys } from 'utils/queryKeys'

useQuery(queryKeys.metricsForIp(ip), fetchMetrics)
useQuery(queryKeys.piraniaPortalConfig(), fetchPortalConfig)
```

**Impact:** All query keys must use the centralized `queryKeys` registry. Direct string arrays are deprecated.

### 2. Error Handling System

#### New Error Boundary Requirements
**Before (v3):**
```javascript
// Manual error handling per component
if (error) return <div>Error occurred</div>
```

**After (v4):**
```javascript
// Centralized error boundaries with specialized handlers
<QueryErrorBoundary fallback={QueryErrorFallback}>
  <Component />
</QueryErrorBoundary>
```

**Impact:** Components should leverage centralized error boundaries instead of manual error handling.

### 3. Asset Management

#### Image Asset Changes
**Before (v3):**
```javascript
// Large unoptimized assets
src="assets/icons/android-chrome-512x512.png" // 15KB PNG
src="assets/icons/AlterMundiLogo.svg"          // 190KB SVG
```

**After (v4):**
```javascript
// Optimized SVG assets
src="assets/icons/android-chrome-512x512.svg"  // 390 bytes SVG
src="assets/icons/AlterMundiLogo.svg"          // 22KB optimized SVG
```

**Impact:** 89% bundle size reduction. PNG assets converted to optimized SVG format.

### 4. Layout System

#### Footer Component Positioning
**Before (v3):**
```javascript
// Fixed positioning causing overlaps
className="fixed bottom-0 z-50"
```

**After (v4):**
```javascript
// Normal flow with proper spacing
className="w-full flex justify-around mt-8 py-4 bg-white"
```

**Impact:** Footer no longer overlaps content, responsive behavior improved.

## Migration Steps

### Step 1: Update Query Hook Usage

Replace all `useMutation` function syntax:

```bash
# Find all useMutation calls
grep -r "useMutation(" plugins/ src/

# Update syntax from:
useMutation(mutationFn, options)
# To:
useMutation({ mutationFn, ...options })
```

### Step 2: Migrate Query Keys

1. Import centralized query keys:
```javascript
import { queryKeys } from 'utils/queryKeys'
```

2. Replace hardcoded keys:
```javascript
// Before
useQuery(['lime-metrics', 'get_metrics', ip], ...)
// After  
useQuery(queryKeys.metricsForIp(ip), ...)
```

### Step 3: Update Error Handling

Wrap components with error boundaries:
```javascript
import { QueryErrorBoundary, QueryErrorFallback } from 'components/QueryErrorBoundary'

<QueryErrorBoundary fallback={QueryErrorFallback}>
  <YourComponent />
</QueryErrorBoundary>
```

### Step 4: Verify Asset References

Update any hardcoded asset references to use the new optimized formats:
- `.png` icons → `.svg` equivalents where available
- Check bundle sizes after migration

## Performance Improvements

### Cache Strategy Optimization
- **Smart caching**: Data-specific cache durations
- **Error boundaries**: Graceful error recovery
- **Query invalidation**: Intelligent cache invalidation patterns

### Bundle Size Reduction
- **Assets optimized**: 89% reduction (226KB → 25KB)
- **Code splitting**: Improved lazy loading
- **Tree shaking**: Unused code elimination

## Testing Migration

### 1. Build Verification
```bash
npm run build
# Should complete without TypeScript errors
```

### 2. Development Server
```bash
npm run dev
# Check console for warnings/errors
```

### 3. Real Device Testing
```bash
# Test on actual LibreMesh devices
ping 7c2  # Test connectivity
ping 1aa  # Test connectivity
```

## Rollback Strategy

If issues arise, revert specific commits:
```bash
# Revert to pre-v4 state
git revert HEAD~10..HEAD

# Or checkout specific version
git checkout v3.0
```

## Support & Resources

- **Forum**: [foro.librerouter.org](https://foro.librerouter.org)
- **Docs**: [docs.altermundi.net](https://docs.altermundi.net)
- **Issues**: Report migration issues via GitHub Issues

## Migration Checklist

- [ ] Update all `useMutation` calls to object syntax
- [ ] Migrate to centralized `queryKeys`
- [ ] Implement error boundaries where needed
- [ ] Verify asset loading (especially SVG replacements)
- [ ] Test real device connectivity
- [ ] Run full build and test suite
- [ ] Performance testing and validation

---

*Generated during v4 foundation migration*
*Last updated: 2025-08-29*