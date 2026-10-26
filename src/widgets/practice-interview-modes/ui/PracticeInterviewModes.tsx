'use client';

import { Section } from '~&/shared/ui/section';

import { practiceModes } from '../lib';
import { PracticeModeCard } from './parts/PracticeModeCard';

export function PracticeInterviewModes() {
    return (
        <Section className="max-w-[1400]">
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {practiceModes.map((practiceMode) => (
                    <PracticeModeCard
                        key={practiceMode.href}
                        {...practiceMode}
                    />
                ))}
            </div>
        </Section>
    );
}
