

/**
 * Interface that defines the styling of drawing konva text
 * 
 * Refer: https://konvajs.org/api/Konva.Text.html
 */
export interface ITextStyle {
    fontFamily: string;
    color: string;

    // 'normal', 'bold', 'italic' or even 'italic bold'
    fontStyle?: string;             
    // 'line-through', 'underline'
    textDecoration?: string;        
    lineHeight?: number;
    
    strokeColor?: string;
    strokeWidth?: number;

    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}