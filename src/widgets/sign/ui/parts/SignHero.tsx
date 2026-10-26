'use client';

import { CodeWindow } from '~&/shared/ui/code-window';
import { Description } from '~&/shared/ui/description';
import { Logo } from '~&/shared/ui/logo';

import { SIGN_STATS } from '../../lib';

export function SignHero() {
    return (
        <div className="flex w-full max-w-[560px] flex-col">
            <Logo
                className="w-auto"
                size="md"
            />
            <h1 className="text-foreground mt-[11px] font-[family-name:var(--font-inter)] text-[32px] leading-[1.15] font-extrabold md:text-[40px]">
                Технические интервью в <span className="text-primary">реальном коде.</span>
            </h1>
            <Description className="mt-[11px] max-w-[420px] text-[13px] leading-5 text-[#9A9A9A]">
                Совместный редактор, видео и честная оценка —<br />
                прямо в браузере, без установки.
            </Description>
            <CodeWindow className="my-8 w-full lg:animate-none" />
            <div className="flex items-start gap-[32px]">
                {SIGN_STATS.map((stat) => (
                    <div
                        key={stat.value}
                        className="flex flex-col"
                    >
                        <p className="text-foreground font-[family-name:var(--font-inter)] text-[28px] leading-none font-extrabold">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-[#9A9A9A]">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
