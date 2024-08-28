"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "./ui/use-toast";
import { z } from "zod";
import {
  page1Schema,
  page3Schema,
  page4Schema,
  userSchema,
} from "@/validation/user";
import { revalidatePath } from "next/cache";

export default function Multiform() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    heardFrom: "social-media",
    photo: null,
    phone: "",
    address: "",
    occupation: "",
    company: "",
    comments: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const ProgressBar = ({ current, total }: { current: any; total: any }) => {
    const percentage = Math.round((current / total) * 100);
    return (
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium w-12">{percentage}%</span>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const validatePage = () => {
    let result;
    if (currentPage === 1) {
      result = page1Schema.safeParse(formData);
    } else if (currentPage === 3) {
      result = page3Schema.safeParse(formData);
    } else if (currentPage === 4) {
      result = page4Schema.safeParse(formData);
    }

    if (result && !result.success) {
      const errorMessages = result.error.format();
      setErrors(errorMessages);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleNext = () => {
    if (validatePage()) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Final validation on submit
    if (validatePage()) {
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast({
        title: "Form Submitted",
        description: (
          <>
            <pre>
              <code>{JSON.stringify(formData, null, 2)}</code>
            </pre>
          </>
        ),
      });

      revalidatePath("/registered");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-secondary border rounded-lg shadow-md">
      <ProgressBar current={currentPage} total={totalPages} />
      <h2 className="text-2xl font-bold mb-6">Multi-Part Form</h2>
      <form onSubmit={handleSubmit}>
        {currentPage === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name._errors[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email._errors[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Where did you hear about us?</Label>
              <RadioGroup
                value={formData.heardFrom}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, heardFrom: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social-media" id="social-media" />
                  <Label htmlFor="social-media">Social Media</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friend" id="friend" />
                  <Label htmlFor="friend">Friend or Colleague</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="search" id="search" />
                  <Label htmlFor="search">Search Engine</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advertisement" id="advertisement" />
                  <Label htmlFor="advertisement">Advertisement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Photo</h3>
            <div>
              <Label htmlFor="photo">Upload your photo</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                ref={fileInputRef}
                className="cursor-pointer"
              />
              {formData.photo && <p className="mt-2 text-sm text-gray-500"></p>}
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-600">{errors.phone._errors[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
              {errors.address && (
                <p className="text-red-600">{errors.address._errors[0]}</p>
              )}
            </div>
          </div>
        )}

        {currentPage === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                placeholder="Enter your occupation"
              />
              {errors.occupation && (
                <p className="text-red-600">{errors.occupation._errors[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company name"
              />
              {errors.company && (
                <p className="text-red-600">{errors.company._errors[0]}</p>
              )}
            </div>
          </div>
        )}

        {currentPage === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Comments</h3>
            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Any additional comments?"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {currentPage > 1 && (
            <Button type="button" onClick={handlePrevious} variant="outline">
              Previous
            </Button>
          )}
          {currentPage < totalPages && (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next
            </Button>
          )}
          {currentPage === totalPages && (
            <Button type="submit" onClick={handleSubmit} className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
