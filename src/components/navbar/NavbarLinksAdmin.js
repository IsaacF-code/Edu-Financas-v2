// Chakra Imports
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom Components
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
import jwtDecode from 'jwt-decode';
// Assets
import routes from 'routes.js';
import { ColorModeToggle } from '@hypertheme-editor/chakra-ui';
import { VSeparator } from 'components/separator/Separator';
import { useHistory } from 'react-router-dom';
export default function HeaderLinks(props) {
	const { secondary } = props;
	// Chakra Color Mode
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	
	const navigate = useHistory();
	
	const token = localStorage.getItem("token");
	if (!token) {
		alert("Você não está logado!");
		navigate.push("/auth/sign-in");
	} 

	const tokenObject = jwtDecode(token);
	const userEmail = tokenObject.email;

	// console.log("token: ", token)
	// console.log("name token: ", tokenObject.name)
	// console.log("id token: ", tokenObject.id)
	// console.log("email token: ", tokenObject.email)
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		alert("Logout efetuado com sucesso!");
		navigate.push("/auth/sign-in");
	}

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			
			<SidebarResponsive routes={routes} />
			
			{/* Botão de modo claro/escuro */}
			<ColorModeToggle showLabel />
			{/* Separador */}
			<VSeparator mr="10px" /> 

			{/* Menu no navbar para o avatar/Perfil */}
			<Menu>
				<MenuButton p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name={userEmail}
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hey, {userEmail} {/* Ainda não está pegando o nome do usuário */}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px"
							onClick={handleLogout}
							>
							 <Text fontSize="sm">Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
