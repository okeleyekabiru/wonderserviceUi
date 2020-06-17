export interface IOption {
  value: string;
  label?: string;
	selected?: boolean;
	color?: string;
	disabled?: boolean;
}
export interface IOptions{
	body: IOption[],
	status: number,
	success: boolean,
	message: string
}