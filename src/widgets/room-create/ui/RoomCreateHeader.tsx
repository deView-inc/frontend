import { Description } from '~&/shared/ui/description';
import { Title } from '~&/shared/ui/title';

export function RoomCreateHeader() {
    return (
        <header className="flex flex-col gap-1.5">
            <Title className="font-[family-name:var(--font-inter)] text-[22px] font-extrabold md:text-[26px]">
                Создать комнату
            </Title>
            <Description>Настройте параметры сессии — партнер увидит их до входа</Description>
        </header>
    );
}
