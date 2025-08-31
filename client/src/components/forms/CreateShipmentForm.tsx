import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { toast } from "sonner";
import { NewShipmentMutationFn } from "@/lib/RequestLibrary";
import { NewShipmentFormSchema, type NewShipmentFormType } from "./schemas";
import UseModal from "@/hooks/UseModal";
import FormSection from "./FormSection";

const CreateShipmentForm = () => {
  const form = useForm<NewShipmentFormType>({
    resolver: zodResolver(NewShipmentFormSchema),
    defaultValues: {
      senderName: "",
      senderEmail: "",
      senderPhone: "",
      receiverPhone: "",
      receiverName: "",
      pickupAddress: "",
      deliveryAddress: "",
      priority: "normal",
      weight: 1,
      pickupDate: "",
      deliveryDate: "",
      notes: "",
    },
  });

  const createShipmentMutation = useMutation({
    mutationFn: NewShipmentMutationFn,
  });
  const onSubmit = (data: Record<string, any>) => {
    const deliveryDate = data.deliveryDate ? new Date(data.deliveryDate) : null;
    createShipmentMutation.mutate({
      ...data,
      deliveryDate,
    });
  };
  const { setOpenShipmentModal } = UseModal();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Sender's Info Section */}
        <FormSection
          name="sf-sender-section"
          label="Sender's Info"
          labelFor="sf-sendername"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              {/* Sender Name */}
              <FormField
                control={form.control}
                name="senderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="sf-sendername">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="sf-sendername"
                        placeholder="Enter sender name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Sender Email */}
            <FormField
              control={form.control}
              name="senderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="sender@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Sender Phone */}
            <FormField
              control={form.control}
              name="senderPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="sender phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
        {/* Receivers's Info Section */}
        <FormSection
          name="sf-receiver-section"
          label="Receiver's Info"
          labelFor="sf-receivername"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              {/* Receiver Name */}
              <FormField
                control={form.control}
                name="receiverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="sf-receivername">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="sf-receivername"
                        placeholder="Enter receiver name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Receiver Email */}
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="receiver@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Receiver Phone */}
            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="receiver phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
        {/* Shipment Details Section */}
        <FormSection
          name="sf-shipment-details"
          label="Shipmnent Details"
          labelFor="sf-pickup-address"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="sf-pickup-address">
                    Pickup Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="sf-pickup-address"
                      placeholder="Enter pickup address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="sf-delivery-address">
                    Delivery Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="sf-delivery-address"
                      placeholder="Enter destination address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (lbs)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Date</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special instructions or notes..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setTimeout(() => setOpenShipmentModal(false), 100);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={createShipmentMutation.isPending}>
            {createShipmentMutation.isPending
              ? "Creating..."
              : "Create Shipment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateShipmentForm;
