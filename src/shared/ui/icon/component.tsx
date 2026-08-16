import type { IconProps } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { cn } from '~&/shared/lib/utils';

import { Skeleton } from '../skeleton';

type PhosphorIconName = keyof typeof import('@phosphor-icons/react/dist/ssr');

type BaseIconProps = IconProps & {
    name: PhosphorIconName;
};
type DynamicIconProps = BaseIconProps;

type IconPropsWithFallback = BaseIconProps & {
    /** Компонент-заглушка во время загрузки */
    fallback?: React.ReactNode;
    /** Классы для скелетона (если fallback не передан) */
    skeletonClassName?: string;
};

const ICON_CACHE = new Map<PhosphorIconName, React.ComponentType<IconProps>>();

/**
 * LazyIcon - это React-компонент, который динамически загружает и рендерит иконки
 * из библиотеки `@phosphor-icons/react`. Для оптимизации производительности
 * и уменьшения повторных импортов используется кэширование.
 *
 * @component
 * @param {DynamicIconProps} props - Свойства компонента DynamicIcon.
 * @param {DynamicIconName} props.name - Название иконки для рендеринга.
 * Должно быть одним из предопределённых имён иконок.
 * @param {IconProps} [props] - Дополнительные свойства, поддерживаемые
 * библиотекой `@phosphor-icons/react`.
 *
 * @example
 * ```tsx
 * import { LazyIcon } from './lazy-icon';
 *
 * const Example = () => {
 *   return (
 *     <div>
 *       <DynamicIcon name="Airplane" size={32} />
 *     </div>
 *   );
 * };
 * ```
 */
function DynamicIcon(props: DynamicIconProps) {
    const { name, ...rest } = props;

    const replacedActualName = name.replace(/Icon$/, '') as PhosphorIconName;

    const CachedIcon = ICON_CACHE.get(replacedActualName);

    if (CachedIcon) {
        return <CachedIcon {...rest} />;
    }

    const IconComponent = dynamic(() =>
        import(`@phosphor-icons/react/dist/ssr/${replacedActualName}`).then((mod) => {
            const IconMod = mod[replacedActualName] as React.ComponentType<IconProps>;
            ICON_CACHE.set(replacedActualName, IconMod);
            return IconMod;
        }),
    );

    return <IconComponent {...rest} />;
}

/**
 * Icon - компонент для рендеринга иконки с поддержкой ленивой загрузки и состояния загрузки.
 *
 * Использует React.Suspense для отображения заглушки (fallback) на время
 * динамической загрузки иконки из библиотеки @phosphor-icons/react.
 *
 * @component
 * @param {IconPropsWithFallback} props - Свойства компонента.
 * @param {string} props.name - Название иконки (например, 'House', 'User').
 * @param {React.ReactNode} [props.fallback] - Кастомная заглушка на время загрузки.
 * @param {string} [props.skeletonClassName] - Дополнительные CSS-классы для скелетона.
 * @param {IconProps} [props] - Остальные свойства иконки (size, weight, color и т.д.).
 *
 * @returns {JSX.Element} Иконка или заглушка во время загрузки.
 *
 * @example
 * ```tsx
 * // Базовое использование
 * <Icon name="House" size={24} weight="bold" />
 *
 * // С кастомной заглушкой
 * <Icon
 *   name="User"
 *   size={32}
 *   fallback={<div className="animate-pulse">Загрузка...</div>}
 * />
 *
 * // С кастомными классами для скелетона
 * <Icon name="Bell" skeletonClassName="w-6 h-6 bg-lime-500/20" />
 * ```
 */
function Icon(props: IconPropsWithFallback) {
    const { fallback, skeletonClassName, ...rest } = props;

    const defaultFallback = <Skeleton className={cn('size-4 rounded-sm', skeletonClassName)} />;

    return (
        <React.Suspense fallback={fallback ?? defaultFallback}>
            <DynamicIcon {...rest} />
        </React.Suspense>
    );
}

export { Icon };
export type { PhosphorIconName, IconPropsWithFallback as IconProps };
