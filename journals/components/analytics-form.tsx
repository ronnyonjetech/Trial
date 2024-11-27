import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Simple Filter Icon using SVG
const FilterIcon = () => (
  <svg
    className="h-4 w-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18"
    />
  </svg>
);

export default function AnalyticsForm({ onCriteriaChange }: { onCriteriaChange: (criteria: any) => void }) {
  const [formData, setFormData] = useState({
    country: '',
    discipline: '',
    language: '',
    googleScholar: false,
    scopus: false,
    doaj: '',
    oaj: '',
    publisherAfrica: '',
    inasp: '',
    cope: '',
    issn: '',
  });

  const handleInputChange = (field: string, value: any) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onCriteriaChange(updatedFormData); // Pass updated data to parent
  };

  return (
    <section className="space-y-6 p-4 border border-red-500">
      <div className="space-y-4">
        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={(value) => handleInputChange('country', value)}>
            <SelectTrigger id="country">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
          </Select>
        </div>

        {/* Discipline */}
        <div className="space-y-2">
          <Label htmlFor="discipline">Discipline</Label>
          <Select onValueChange={(value) => handleInputChange('discipline', value)}>
            <SelectTrigger id="discipline">
              <SelectValue placeholder="All Disciplines" />
            </SelectTrigger>
          </Select>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select onValueChange={(value) => handleInputChange('language', value)}>
            <SelectTrigger id="language">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
          </Select>
        </div>

        {/* Indexed On */}
        <div className="space-y-2">
          <Label htmlFor="google-scholar">Indexed on</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="google-scholar"
                checked={formData.googleScholar}
                onCheckedChange={(value) => handleInputChange('googleScholar', value)}
              />
              <Label htmlFor="google-scholar">Google Scholar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scopus"
                checked={formData.scopus}
                onCheckedChange={(value) => handleInputChange('scopus', value)}
              />
              <Label htmlFor="scopus">Scopus</Label>
            </div>
          </div>
        </div>

        {/* DOAJ */}
        <div className="space-y-2">
          <Label htmlFor="doaj">Listed on Directory of Open Access Journal (DOAJ)</Label>
          <Select onValueChange={(value) => handleInputChange('doaj', value)}>
            <SelectTrigger id="doaj">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
          </Select>
        </div>

        {/* OAJ */}
        <div className="space-y-2">
          <Label htmlFor="oaj">Listed on Open Access Journal (OAJ)</Label>
          <Select onValueChange={(value) => handleInputChange('oaj', value)}>
            <SelectTrigger id="oaj">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
          </Select>
        </div>

        {/* Publisher Based in Africa */}
        <div className="space-y-2">
          <Label htmlFor="publisher-africa">Online Publisher Based in Africa</Label>
          <Select onValueChange={(value) => handleInputChange('publisherAfrica', value)}>
            <SelectTrigger id="publisher-africa">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
          </Select>
        </div>

        {/* INASP */}
        <div className="space-y-2">
          <Label htmlFor="inasp">Hosted on INASP's Journals Online</Label>
          <Select onValueChange={(value) => handleInputChange('inasp', value)}>
            <SelectTrigger id="inasp">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
          </Select>
        </div>

        {/* COPE */}
        <div className="space-y-2">
          <Label htmlFor="cope">Member of Committee on Publication Ethics (COPE)</Label>
          <Select onValueChange={(value) => handleInputChange('cope', value)}>
            <SelectTrigger id="cope">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
          </Select>
        </div>

        {/* ISSN */}
        <div className="space-y-2">
          <Label htmlFor="issn">Listed on International Standard Serial Number (ISSN) Portal</Label>
          <Select onValueChange={(value) => handleInputChange('issn', value)}>
            <SelectTrigger id="issn">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
          </Select>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-4">
            <FilterIcon />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg space-y-4 overflow-auto max-h-[80vh] p-6">
          <AnalyticsForm onCriteriaChange={onCriteriaChange} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
