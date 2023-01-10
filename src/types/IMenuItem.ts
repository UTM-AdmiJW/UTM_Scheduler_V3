

// In the application has a lot of enums, almost half of it is used inside select type input elements
// 
// To unify the interface of conversion from enum to select options, IMenuItem encapsulates the enum
// and defines the label that should be used to represent the enum.
//
// This type should be used along with getMenuItemsfromIMenuItems() from menuItemUtils.tsx, where
// the menuItem will be returned in
//
//  <MenuItem value={value}>{ label }</MenuItem>
export type IMenuItem<T extends number | string> = {
    value: T;
    label: string;
}
