import {
    Card,
    CardContent,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
    Input,
    Switch,
} from '~&/shared/ui';

import { DEFAULT_ROOM_NAME, DIFFICULTIES, EXTRA_LANGUAGES, PRIMARY_LANGUAGES } from '../../lib';
import type { RoomCreateFormModel } from '../../model/useRoomCreateForm';
import { RoomCreateOptionChip } from './RoomCreateOptionChip';

export function RoomCreateFields({
    aiHints,
    difficulty,
    handleLanguageChange,
    isOpen,
    isPrimaryLanguage,
    language,
    name,
    recording,
    setAiHints,
    setDifficulty,
    setIsOpen,
    setName,
    setRecording,
    setTask,
    task,
}: RoomCreateFormModel) {
    return (
        <Card className="w-full max-w-[680px] min-w-0 flex-1 ring-0">
            <CardContent className="flex flex-col gap-[22px]">
                <Field>
                    <FieldLabel htmlFor="room-name">Название комнаты</FieldLabel>
                    <Input
                        id="room-name"
                        value={name}
                        placeholder={DEFAULT_ROOM_NAME}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Field>

                <FieldSet className="gap-2">
                    <FieldLegend className="mb-0">Язык программирования</FieldLegend>
                    <div className="flex flex-wrap gap-2">
                        {PRIMARY_LANGUAGES.map((item) => (
                            <RoomCreateOptionChip
                                key={item.id}
                                selected={language === item.id}
                                onClick={() => handleLanguageChange(item.id)}
                            >
                                {item.label}
                            </RoomCreateOptionChip>
                        ))}
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <RoomCreateOptionChip selected={!isPrimaryLanguage}>
                                        {`+${EXTRA_LANGUAGES.length} еще`}
                                    </RoomCreateOptionChip>
                                }
                            />
                            <DropdownMenuContent className="max-h-64 min-w-40">
                                <DropdownMenuRadioGroup
                                    value={language}
                                    onValueChange={handleLanguageChange}
                                >
                                    {EXTRA_LANGUAGES.map((item) => (
                                        <DropdownMenuRadioItem
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </FieldSet>

                <FieldSet className="gap-2">
                    <FieldLegend className="mb-0">Уровень сложности</FieldLegend>
                    <div className="flex flex-wrap gap-2">
                        {DIFFICULTIES.map((item) => (
                            <RoomCreateOptionChip
                                key={item.id}
                                selected={difficulty === item.id}
                                onClick={() => setDifficulty(item.id)}
                            >
                                {item.label}
                            </RoomCreateOptionChip>
                        ))}
                    </div>
                </FieldSet>

                <FieldSet className="gap-2">
                    <FieldLegend className="mb-0">Формат</FieldLegend>
                    <Field
                        orientation="horizontal"
                        className="w-full items-center justify-between"
                    >
                        <FieldContent className="min-w-0">
                            <FieldTitle>Открытая комната</FieldTitle>
                            <FieldDescription>
                                Видна в общем поиске, присоединиться может любой
                            </FieldDescription>
                        </FieldContent>
                        <Switch
                            checked={isOpen}
                            className="shrink-0"
                            onCheckedChange={setIsOpen}
                        />
                    </Field>
                    <Field
                        orientation="horizontal"
                        className="w-full items-center justify-between"
                    >
                        <FieldContent className="min-w-0">
                            <FieldTitle>AI-подсказки</FieldTitle>
                            <FieldDescription>
                                Показывать участнику подсказки при затруднении
                            </FieldDescription>
                        </FieldContent>
                        <Switch
                            checked={aiHints}
                            className="shrink-0"
                            onCheckedChange={setAiHints}
                        />
                    </Field>
                    <Field
                        orientation="horizontal"
                        className="w-full items-center justify-between"
                    >
                        <FieldContent className="min-w-0">
                            <FieldTitle>Запись сессии</FieldTitle>
                            <FieldDescription>
                                Сохранить видео и код после завершения
                            </FieldDescription>
                        </FieldContent>
                        <Switch
                            checked={recording}
                            className="shrink-0"
                            onCheckedChange={setRecording}
                        />
                    </Field>
                </FieldSet>

                <Field>
                    <FieldLabel htmlFor="room-task">Задача (необязательно)</FieldLabel>
                    <Input
                        id="room-task"
                        value={task}
                        placeholder="Вставьте свою задачу или выберите из библиотеки"
                        onChange={(event) => setTask(event.target.value)}
                    />
                    <FieldDescription>
                        Если оставить пустым — задача подберется автоматически по уровню сложности
                    </FieldDescription>
                </Field>
            </CardContent>
        </Card>
    );
}
