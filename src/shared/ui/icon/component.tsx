'use client';

import {
    AppWindowIcon,
    ArrowRightIcon,
    BellIcon,
    ChalkboardSimpleIcon,
    ChalkboardTeacherIcon,
    ClockCounterClockwiseIcon,
    CodeBlockIcon,
    CrownIcon,
    DotsThreeVerticalIcon,
    GearIcon,
    GlobeHemisphereEastIcon,
    GridFourIcon,
    HandWavingIcon,
    HouseIcon,
    IdentificationCardIcon,
    InfoIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    QuestionIcon,
    SignInIcon,
    SignOutIcon,
    StarIcon,
    StudentIcon,
    UserCirclePlusIcon,
    UserIcon,
    UserPlusIcon,
    UserSoundIcon,
    UsersIcon,
    type IconProps,
    ChartPieSliceIcon,
} from '@phosphor-icons/react';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

import { Skeleton } from '../skeleton';

const ICONS = {
    Plus: PlusIcon,
    PlusIcon,

    User: UserIcon,
    UserIcon,

    Gear: GearIcon,
    GearIcon,

    Question: QuestionIcon,
    QuestionIcon,

    Info: InfoIcon,
    InfoIcon,

    SignOut: SignOutIcon,
    SignOutIcon,

    DotsThreeVertical: DotsThreeVerticalIcon,
    DotsThreeVerticalIcon,

    MagnifyingGlass: MagnifyingGlassIcon,
    MagnifyingGlassIcon,

    Bell: BellIcon,
    BellIcon,

    ArrowRight: ArrowRightIcon,
    ArrowRightIcon,

    IdentificationCard: IdentificationCardIcon,
    IdentificationCardIcon,

    Star: StarIcon,
    StarIcon,

    HandWaving: HandWavingIcon,
    HandWavingIcon,

    House: HouseIcon,
    HouseIcon,

    ChartPieSlice: ChartPieSliceIcon,
    ChartPieSliceIcon,

    GridFour: GridFourIcon,
    GridFourIcon,

    Users: UsersIcon,
    UsersIcon,

    ClockCounterClockwise: ClockCounterClockwiseIcon,
    ClockCounterClockwiseIcon,

    SignIn: SignInIcon,
    SignInIcon,

    UserPlus: UserPlusIcon,
    UserPlusIcon,

    Student: StudentIcon,
    StudentIcon,

    AppWindow: AppWindowIcon,
    AppWindowIcon,

    GlobeHemisphereEast: GlobeHemisphereEastIcon,
    GlobeHemisphereEastIcon,

    UserSound: UserSoundIcon,
    UserSoundIcon,

    ChalkboardTeacher: ChalkboardTeacherIcon,
    ChalkboardTeacherIcon,

    ChalkboardSimple: ChalkboardSimpleIcon,
    ChalkboardSimpleIcon,

    UserCirclePlus: UserCirclePlusIcon,
    UserCirclePlusIcon,

    CodeBlock: CodeBlockIcon,
    CodeBlockIcon,

    Crown: CrownIcon,
    CrownIcon,
} as const;

type PhosphorIconName = keyof typeof ICONS;

type BaseIconProps = IconProps & {
    name: PhosphorIconName;
};

type IconPropsWithFallback = BaseIconProps & {
    fallback?: React.ReactNode;
    skeletonClassName?: string;
};

function Icon(props: IconPropsWithFallback) {
    const { name, fallback, skeletonClassName, ...rest } = props;

    const IconComponent = ICONS[name];

    if (!IconComponent) {
        return fallback ?? <Skeleton className={cn('size-4 rounded-sm', skeletonClassName)} />;
    }

    return <IconComponent {...rest} />;
}

export { Icon };

export type { PhosphorIconName, IconPropsWithFallback as IconProps };
