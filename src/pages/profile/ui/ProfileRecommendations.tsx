import { CheckIcon, ClockIcon, UserIcon } from '@phosphor-icons/react';
import { Card } from '~&/shared/ui';

import { profileMock } from '../lib/profile-mock';

const recommendationIcons = {
    algorithms: CheckIcon,
    architecture: UserIcon,
    speed: ClockIcon,
};

export function ProfileRecommendations() {
    const { recommendations } = profileMock;

    return (
        <Card className="gap-4 rounded-sm p-5">
            <header>
                <h2 className="text-[13px] font-bold">Рекомендации AI</h2>

                <p className="text-muted-foreground mt-0.5 text-[11.5px]">
                    На основе последних 10 сессий
                </p>
            </header>

            <div className="flex flex-col gap-3">
                {recommendations.map((recommendation) => {
                    const Icon = recommendationIcons[recommendation.kind];

                    const isSuccess = recommendation.tone === 'success';

                    return (
                        <article
                            key={recommendation.title}
                            className="bg-secondary flex min-h-[81px] items-start gap-3 rounded-sm border px-3.5 py-3"
                        >
                            <div className="bg-muted grid size-7 shrink-0 place-items-center rounded-sm">
                                <Icon
                                    className={isSuccess ? 'text-primary' : 'text-muted-foreground'}
                                    size={14}
                                />
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-[13px] leading-4 font-semibold">
                                    {recommendation.title}
                                </h3>

                                <p className="text-muted-foreground mt-0.5 text-xs leading-[18px]">
                                    {recommendation.description}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </Card>
    );
}
