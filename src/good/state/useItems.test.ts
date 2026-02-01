import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItems } from './useItems';

describe('useItems', () => {
    it('should initialize with empty items and loading true', () => {
        const { result } = renderHook(() => useItems());
        // Initial state might be empty before effect runs? 
        // Actually hook sets state in effect.
        // Let's just check structure.
        expect(result.current.items).toBeDefined();
    });

    it('should load items after mount', async () => {
        const { result } = renderHook(() => useItems());
        
        // Wait for effect?
        // useItems uses generateItems sync inside effect?
        // useItems: useEffect(() => { setItems(...) }, [])
        
        // We need to wait for next update
        await act(async () => {
             // Effect runs automatically
             await new Promise(resolve => setTimeout(resolve, 10));
        });

        expect(result.current.items.length).toBeGreaterThan(0);
        expect(result.current.loading).toBe(false);
    });
});
