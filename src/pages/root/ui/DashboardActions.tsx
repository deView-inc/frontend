import { ArrowRightIcon, PlusCircleIcon, UsersIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ROUTES } from '~&/shared/config';

function ActionCopy({ description, title }: { description: string; title: string }) {
    return (
        <span className="ml-2 min-w-0 flex-1">
            <span className="block text-[11px] leading-none font-semibold text-[#E5E7EB]">
                {title}
            </span>
            <span className="mt-[2px] block text-[8px] leading-none text-[#626870]">
                {description}
            </span>
        </span>
    );
}

function SessionActionIcon() {
    return (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[rgba(163,230,53,0.12)]">
            <PlusCircleIcon
                aria-hidden="true"
                className="text-[#A3E635]"
                size={16}
                weight="fill"
            />
        </span>
    );
}

function PartnerActionIcon() {
    return (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[rgba(139,92,246,0.13)]">
            <UsersIcon
                aria-hidden="true"
                className="text-[#A78BFA]"
                size={16}
                weight="fill"
            />
        </span>
    );
}

function ActionCard({
    children,
    href,
}: {
    children: ReactNode;
    href: ComponentProps<typeof Link>['href'];
}) {
    return (
        <Link
            className="bg-popover ring-foreground/10 flex h-[62px] items-center rounded-[9px] py-[12px] pr-[14px] pl-[13px] ring-1 outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/40"
            href={href}
        >
            {children}
            <ArrowRightIcon
                aria-hidden="true"
                className="ml-2 shrink-0 text-[#565C64]"
                size={12}
                weight="bold"
            />
        </Link>
    );
}

function CreateSessionAction() {
    return (
        <ActionCard href={ROUTES.ROOM.CREATE}>
            <SessionActionIcon />
            <ActionCopy
                description="Пригласите кандидата или коллегу"
                title="Создать сессию"
            />
        </ActionCard>
    );
}

function FindPartnerAction() {
    return (
        <ActionCard href={ROUTES.PARTICIPANTS}>
            <PartnerActionIcon />
            <ActionCopy
                description="Витрина участников для mock-интервью"
                title="Найти партнёра"
            />
        </ActionCard>
    );
}

export function DashboardActions() {
    return (
        <div className="grid grid-cols-2 gap-[10px]">
            <CreateSessionAction />
            <FindPartnerAction />
        </div>
    );
}
