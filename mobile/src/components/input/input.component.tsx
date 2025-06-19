import React from 'react';
import {
	StyleProp,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
	TouchableOpacity,
} from 'react-native';
import {
	Control,
	FieldPath,
	FieldPathValue,
	FieldValues,
	RegisterOptions,
	useController,
} from 'react-hook-form';

import { EyeIcon } from '../../assets/icons/eye';
import { StrikedEyeIcon } from '../../assets/icons/striked-eye';

import { InputError } from '../input-error';
import { COLORS } from '../../enums';
import { useThemeStore } from '../../store';
import { styles } from './input.styles';

type InputProps<
	T extends FieldValues = FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
> = {
	name: N;
	control: Control<T>;
	defaultValue: FieldPathValue<T, N>;
	rules?:
		| Omit<
				RegisterOptions<T, N>,
				'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
		>
		| undefined;
	label?: string;
	placeholder?: string;
	extraInputContainerStyles?: StyleProp<ViewStyle>;
	extraErrorStyles?: StyleProp<TextStyle>;
	secureTextEntry?: boolean;
	disabled?: boolean;
};

export function Input<
	T extends FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
>({
	control,
	name,
	rules,
	defaultValue,
	label,
	placeholder,
	extraInputContainerStyles,
	extraErrorStyles = {},
	secureTextEntry = false,
	disabled = false,
}: InputProps<T, N>) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(!secureTextEntry);
	const inputRef = React.createRef<TextInput>();
	const { theme } = useThemeStore();

	const {
		field: { value, onBlur, onChange },
		fieldState: { error },
	} = useController({
		control,
		defaultValue,
		name,
		rules,
	});

	const handleFocus = () => {
		if (inputRef.current?.isFocused) {
			setIsFocused(true);
			return;
		}
		setIsFocused(false);
	};

	const handleBlur = () => {
		onBlur();
		setIsFocused(false);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<View style={[styles.container, extraInputContainerStyles]}>
			{label && <Text style={[styles.label, {color: COLORS[theme].text_secondary}]}>{label}</Text>}
			<TextInput
				value={value.toString()}
				onChangeText={onChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				style={[
					styles.input,
					value && !error && styles.correct,
					isFocused ? styles.focused && {borderColor: COLORS[theme].border_focus} : {borderColor: COLORS[theme].border},
					error && styles.wrong && {borderColor: COLORS[theme].danger},
					disabled ? {
						backgroundColor: COLORS[theme].background_light_grey,
						color: COLORS[theme].text_secondary,
					} :
					{
						color: COLORS[theme].text_primary,
						backgroundColor: COLORS[theme].backround_input,
					},
				]}
				autoCapitalize="none"
				ref={inputRef}
				secureTextEntry={!showPassword}
				placeholder={placeholder}
				editable={!disabled}
			/>
			{secureTextEntry && (
				<TouchableOpacity
					style={styles.icon_container}
					onPress={togglePasswordVisibility}
				>
					{showPassword ? <EyeIcon /> : <StrikedEyeIcon />}
				</TouchableOpacity>
			)}
			<InputError<T>
				control={control}
				field={name}
				extraErrorStyles={extraErrorStyles}
			/>
		</View>
	);
}
