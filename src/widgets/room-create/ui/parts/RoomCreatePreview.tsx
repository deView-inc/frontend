import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Icon,
} from '~&/shared/ui';

import type { RoomCreateFormModel } from '../../model/useRoomCreateForm';

export function RoomCreatePreview({
    aiHints,
    isOpen,
    previewName,
    recording,
    selectedDifficulty,
    selectedLanguage,
}: RoomCreateFormModel) {
    return (
        <Card className="flex w-full max-w-[680px] shrink-0 flex-col ring-0 md:flex-row xl:w-[280px] xl:max-w-none xl:flex-col">
            <div className="flex min-w-0 flex-1 flex-col">
                <CardHeader>
                    <CardDescription className="text-primary text-[10px] font-semibold tracking-[0.16em] uppercase">
                        Предпросмотр
                    </CardDescription>
                    <CardTitle className="text-sm leading-snug font-semibold">
                        {previewName}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                        {selectedDifficulty ? (
                            <Badge variant="outline">{selectedDifficulty.label}</Badge>
                        ) : null}
                        {selectedLanguage ? (
                            <Badge variant="outline">{selectedLanguage.label}</Badge>
                        ) : null}
                        {isOpen ? <Badge variant="outline">Открытая</Badge> : null}
                        {aiHints ? <Badge variant="outline">AI</Badge> : null}
                        {recording ? <Badge variant="outline">Запись</Badge> : null}
                    </div>
                    <CardDescription>
                        Партнер увидит эту карточку в поиске комнат. Ссылка на прямое приглашение
                        будет доступна после создания.
                    </CardDescription>
                </CardContent>
            </div>
            <CardFooter className="flex-col items-stretch gap-2 border-t-0 md:w-[220px] md:shrink-0 md:justify-center xl:w-full">
                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                >
                    Создать комнату
                    <Icon
                        name="ArrowRightIcon"
                        data-icon="inline-end"
                    />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                >
                    Сохранить как черновик
                </Button>
            </CardFooter>
        </Card>
    );
}
