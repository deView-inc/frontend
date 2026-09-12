import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    Icon,
} from '~&/shared/ui';

import { MY_CARD } from '../model/participants';
import { ParticipantCard } from './ParticipantCard/ParticipantCard';

const MY_CARD_TRIGGER = (
    <Button
        variant="secondary"
        className="h-[42px] gap-2 rounded-[3px] px-[18px] text-[13px]"
    />
);

export function MyCardDialog() {
    return (
        <Dialog>
            <DialogTrigger render={MY_CARD_TRIGGER}>
                <Icon
                    name="IdentificationCard"
                    aria-hidden="true"
                    className="size-4"
                />
                Моя карточка
            </DialogTrigger>
            <DialogContent className="sm:max-w-[440px]">
                <DialogTitle>Моя карточка</DialogTitle>
                <DialogDescription>Предпросмотр карточки участника. Демо-данные.</DialogDescription>
                <ParticipantCard participant={MY_CARD} />
            </DialogContent>
        </Dialog>
    );
}
