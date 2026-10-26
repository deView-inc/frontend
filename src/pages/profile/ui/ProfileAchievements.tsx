import {
    ChartBarIcon,
    CodeSimpleIcon,
    CircleIcon,
    StarFourIcon,
    StackSimpleIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { Card } from '~&/shared/ui';

import { profileMock } from '../lib/profile-mock';

const achievementIcons = {
    'first-interview': StarFourIcon,
    'seven-day-streak': ChartBarIcon,
    'thirty-interviews': UserIcon,
    polyglot: CodeSimpleIcon,
    'high-score': StackSimpleIcon,
    mentor: CircleIcon,
} as const;

export function ProfileAchievements() {
    const { achievements } = profileMock;

    return (
        <Card className="h-full gap-4 rounded-sm p-5">
            <h2 className="text-[13px] font-bold">Достижения</h2>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {achievements.map((achievement) => {
                    const Icon = achievementIcons[achievement.kind];

                    const isHighlighted =
                        achievement.kind === 'first-interview' ||
                        achievement.kind === 'seven-day-streak';

                    return (
                        <article
                            key={achievement.kind}
                            className="bg-secondary flex min-h-[85px] flex-col items-center justify-center gap-2 rounded-sm border px-2 py-3.5"
                        >
                            <div className="bg-muted grid size-[34px] place-items-center rounded-sm">
                                <Icon
                                    className={
                                        isHighlighted ? 'text-primary' : 'text-muted-foreground'
                                    }
                                    size={17}
                                />
                            </div>

                            <p className="text-muted-foreground text-center text-[10.5px] font-semibold">
                                {achievement.label}
                            </p>
                        </article>
                    );
                })}
            </div>
        </Card>
    );
}
