

/**
 * Interface that defines the styling of drawing konva text
 * 
 * Refer: https://konvajs.org/api/Konva.Text.html
 */
export interface ITextStyle {
    fontFamily: string;
    fontSize: number;
    color: string;
    padding: number;

    // 'normal', 'bold', 'italic' or even 'italic bold'
    fontStyle?: string;             
    // 'line-through', 'underline'
    textDecoration?: string;        
    
    strokeColor?: string;
    strokeWidth?: number;

    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}