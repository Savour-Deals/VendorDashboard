var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export function numberToCurrency(amount: number): string {
	return formatter.format(amount);
}