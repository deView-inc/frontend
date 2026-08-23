'use client';

import { Section } from '~&/shared/ui/section';
import { PracticeInterviewHeader } from '~&/widgets/practice-interview-modes/ui/parts/PracticeInterviewHeader';

import { practiceModes } from '../lib';
import { PracticeModeCard } from './parts/PracticeModeCard';

export function PracticeInterviewModes() {
    return (
        <Section className="max-w-[1400]">
            <PracticeInterviewHeader
                title="Режимы собеседований"
                description="7 форматов практики — от живого 1-to-1 до соревновательной арены. Выберите то, что
                нужно прямо сейчас."
            />
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
