'use client';
import {
    ArrowsInSimpleIcon,
    MicrophoneIcon,
    MonitorArrowUpIcon,
    SparkleIcon,
    VideoCameraIcon,
} from '@phosphor-icons/react';
import * as React from 'react';
import { Button } from '~&/shared/ui';

interface Props {}
export const RoomFooter = (props: Props) => (
    <div className="bg-background inline-flex justify-center gap-3 py-3">
        <Button variant="secondary">
            <MicrophoneIcon
                size={32}
                weight="fill"
            />
        </Button>
        <Button variant="secondary">
            <VideoCameraIcon
                size={32}
                weight="fill"
            />
        </Button>
        <Button variant="secondary">
            <MonitorArrowUpIcon
                size={32}
                weight="bold"
            />
        </Button>
        <Button variant="secondary">
            <ArrowsInSimpleIcon size={32} /> Скрыть зону решения
        </Button>
        <Button variant="secondary">
            <SparkleIcon
                size={32}
                weight="fill"
            />
            ИИ-подсказка
        </Button>
    </div>
);
