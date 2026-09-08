'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '~&/shared/ui';

type SystemScale = 'startup' | 'mid-scale' | 'enterprise';

export function SystemDesignScaleTabs() {
    const [scale, setScale] = useState<SystemScale>('startup');

    return (
        <Tabs
            value={scale}
            onValueChange={(value) => setScale(value as SystemScale)}
        >
            <TabsList variant="buttons">
                <TabsTrigger value="startup">Startup</TabsTrigger>
                <TabsTrigger value="mid-scale">Mid-scale</TabsTrigger>
                <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
