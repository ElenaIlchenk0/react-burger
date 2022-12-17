import React, { useRef } from 'react';
import mainIngredientsStyles from './MainIngredient.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { MOVE_INGREDIENT } from '../../services/actions/index';
import { TIngredientData } from '../../types/types'
import { Identifier } from 'dnd-core';

interface IMainIngredients {
    ingredient: TIngredientData;
    index: number;
    onDelete: (ingredient: TIngredientData) => void;
}

type DragObject = {
    id: string;
    index: number;
}

type CollectedProps = {
    handlerId: Identifier | null
}

const MainIngredients: React.FC<IMainIngredients> = ({ ingredient, index, onDelete }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch({ 
            type: MOVE_INGREDIENT, 
            dragIndex,
            hoverIndex
        })
    }

    const [{ handlerId }, drop] = useDrop<DragObject, undefined, CollectedProps>({
        accept: 'constructorIng',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragObject, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current!.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'constructorIng',
        item: () => {
            return { id: ingredient._id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.3 : 1
    drag(drop(ref))

    return (
        <div ref={ref} 
            style={{ opacity }} 
            data-handler-id={handlerId}
            className={mainIngredientsStyles.menuItem} 
            key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => onDelete(ingredient)}
            />
        </div>       
    )
}


export default MainIngredients;
