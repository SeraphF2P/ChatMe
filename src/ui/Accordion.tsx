import * as RadixAccordion from "@radix-ui/react-accordion";
import {
	AccordionContentProps,
	AccordionItemProps,
	AccordionMultipleProps,
	AccordionSingleProps,
	AccordionTriggerProps,
} from "@radix-ui/react-accordion";
import { ElementRef, forwardRef } from "react";
import { Btn, BtnProps } from "./Btn";

// export default () => (
// 	<RadixAccordion.Root>
// 		<RadixAccordion.Item>
// 			<RadixAccordion.Header>
// 				<RadixAccordion.Trigger />
// 			</RadixAccordion.Header>
// 			<RadixAccordion.Content />
// 		</RadixAccordion.Item>
// 	</RadixAccordion.Root>
// );
export const Accordion = (
	props: AccordionSingleProps | AccordionMultipleProps
) => {
	return <RadixAccordion.Root {...props} />;
};
const Button = forwardRef<
	ElementRef<"button">,
	(AccordionTriggerProps | AccordionMultipleProps) & BtnProps
>((props, forwardedRef) => {
	return (
		<RadixAccordion.Trigger asChild>
			<Btn ref={forwardedRef} {...props} />
		</RadixAccordion.Trigger>
	);
});
const Content = forwardRef<ElementRef<"div">, AccordionContentProps>(
	(props, forwardedRef) => {
		return <RadixAccordion.Content ref={forwardedRef} {...props} />;
	}
);
const Item = forwardRef<ElementRef<"div">, AccordionItemProps>(
	(props, forwardedRef) => {
		return <RadixAccordion.Item ref={forwardedRef} {...props} />;
	}
);
Accordion.Btn = Button;
Accordion.Content = Content;
Accordion.Item = Item;
