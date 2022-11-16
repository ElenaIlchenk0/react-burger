import React, { useRef } from 'react';
import mainIngredientsStyles from './MainIngredient.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { MOVE_INGREDIENT } from '../../services/actions/index'

const MainIngredients = ({ ingredient, index, onDelete }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const moveIngredient = (dragIndex, hoverIndex) => {
        dispatch({ 
            type: MOVE_INGREDIENT, 
            dragIndex,
            hoverIndex
        })
    }

    const [{ handlerId }, drop] = useDrop({
        accept: 'constructorIng',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveIngredient(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
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
