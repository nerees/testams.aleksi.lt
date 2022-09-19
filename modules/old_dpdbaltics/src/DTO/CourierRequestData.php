<?php


namespace Invertus\dpdBaltics\DTO;

class CourierRequestData
{
    /**
     * @var string
     */
    private $orderNr;

    /**
     * @var string
     */
    private $payerId;

    /**
     * @var string
     */
    private $senderName;

    /**
     * @var string
     */
    private $senderAddress;

    /**
     * @var string
     */
    private $senderCity;

    /**
     * @var string
     */
    private $senderCountry;

    /**
     * @var int
     */
    private $senderIdWsCountry;

    /**
     * @var string
     */
    private $senderPostalCode;

    /**
     * @var string
     */
    private $senderAddAddress;

    /**
     * @var string
     */
    private $senderContact;

    /**
     * @var string
     */
    private $senderPhoneCode;

    /**
     * @var string
     */
    private $senderPhone;

    /**
     * @var string
     */
    private $senderWorkUntil;

    /**
     * @var string
     */
    private $pickupTime;

    /**
     * @var string
     */
    private $weight;

    /**
     * @var string
     */
    private $parcelsCount;

    /**
     * @var string
     */
    private $palletsCount;

    /**
     * @var string
     */
    private $nonStandard;

    /**
     * @return string
     */
    public function getOrderNr()
    {
        return $this->orderNr;
    }

    /**
     * @param string $orderNr
     */
    public function setOrderNr($orderNr)
    {
        $this->orderNr = $orderNr;
    }

    /**
     * @return string
     */
    public function getPayerId()
    {
        return $this->payerId;
    }

    /**
     * @param string $payerId
     */
    public function setPayerId($payerId)
    {
        $this->payerId = $payerId;
    }

    /**
     * @return string
     */
    public function getSenderName()
    {
        return $this->senderName;
    }

    /**
     * @param string $senderName
     */
    public function setSenderName($senderName)
    {
        $this->senderName = $senderName;
    }

    /**
     * @return string
     */
    public function getSenderAddress()
    {
        return $this->senderAddress;
    }

    /**
     * @param string $senderAddress
     */
    public function setSenderAddress($senderAddress)
    {
        $this->senderAddress = $senderAddress;
    }

    /**
     * @return string
     */
    public function getSenderCity()
    {
        return $this->senderCity;
    }

    /**
     * @param string $senderCity
     */
    public function setSenderCity($senderCity)
    {
        $this->senderCity = $senderCity;
    }

    /**
     * @return string
     */
    public function getSenderCountry()
    {
        return $this->senderCountry;
    }

    /**
     * @param string $senderCountry
     */
    public function setSenderCountry($senderCountry)
    {
        $this->senderCountry = $senderCountry;
    }

    /**
     * @return int
     */
    public function getSenderIdWsCountry()
    {
        return $this->senderIdWsCountry;
    }

    /**
     * @param int $senderIdWsCountry
     */
    public function setSenderIdWsCountry($senderIdWsCountry)
    {
        $this->senderIdWsCountry = $senderIdWsCountry;
    }

    /**
     * @return string
     */
    public function getSenderPostalCode()
    {
        return $this->senderPostalCode;
    }

    /**
     * @param string $senderPostalCode
     */
    public function setSenderPostalCode($senderPostalCode)
    {
        $this->senderPostalCode = $senderPostalCode;
    }

    /**
     * @return string
     */
    public function getSenderAddAddress()
    {
        return $this->senderAddAddress;
    }

    /**
     * @param string $senderAddAddress
     */
    public function setSenderAddAddress($senderAddAddress)
    {
        $this->senderAddAddress = $senderAddAddress;
    }

    /**
     * @return string
     */
    public function getSenderContact()
    {
        return $this->senderContact;
    }

    /**
     * @param string $senderContact
     */
    public function setSenderContact($senderContact)
    {
        $this->senderContact = $senderContact;
    }

    /**
     * @return string
     */
    public function getSenderPhoneCode()
    {
        return $this->senderPhoneCode;
    }

    /**
     * @param string $senderPhoneCode
     */
    public function setSenderPhoneCode($senderPhoneCode)
    {
        $this->senderPhoneCode = $senderPhoneCode;
    }

    /**
     * @return string
     */
    public function getSenderPhone()
    {
        return $this->senderPhone;
    }

    /**
     * @param string $senderPhone
     */
    public function setSenderPhone($senderPhone)
    {
        $this->senderPhone = $senderPhone;
    }

    /**
     * @return string
     */
    public function getSenderWorkUntil()
    {
        return $this->senderWorkUntil;
    }

    /**
     * @param string $senderWorkUntil
     */
    public function setSenderWorkUntil($senderWorkUntil)
    {
        $this->senderWorkUntil = $senderWorkUntil;
    }

    /**
     * @return string
     */
    public function getPickupTime()
    {
        return $this->pickupTime;
    }

    /**
     * @param string $pickupTime
     */
    public function setPickupTime($pickupTime)
    {
        $this->pickupTime = $pickupTime;
    }

    /**
     * @return string
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * @param string $weight
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    /**
     * @return string
     */
    public function getParcelsCount()
    {
        return $this->parcelsCount;
    }

    /**
     * @param string $parcelsCount
     */
    public function setParcelsCount($parcelsCount)
    {
        $this->parcelsCount = $parcelsCount;
    }

    /**
     * @return string
     */
    public function getPalletsCount()
    {
        return $this->palletsCount;
    }

    /**
     * @param string $palletsCount
     */
    public function setPalletsCount($palletsCount)
    {
        $this->palletsCount = $palletsCount;
    }

    /**
     * @return string
     */
    public function getNonStandard()
    {
        return $this->nonStandard;
    }

    /**
     * @param string $nonStandard
     */
    public function setNonStandard($nonStandard)
    {
        $this->nonStandard = $nonStandard;
    }

}
